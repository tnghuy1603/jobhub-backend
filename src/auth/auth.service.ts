import { BadRequestException, Injectable, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from 'src/candidate/entities/candidate.entity';
import { Repository } from 'typeorm';


import * as brcypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Company } from 'src/company/entities/company.entity';
import { Recruiter } from 'src/recruiter/entities/recruiter.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { isMACAddress } from 'class-validator';
import { PasswordHelper } from 'src/helper/password.helper';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>,
              @InjectRepository(Company)private readonly companyRepository: Repository<Company>,
              @InjectRepository(Recruiter)private readonly recruiterRepository: Repository<Recruiter>,
              private jwtService: JwtService
            ){}
  async login(type: string, loginDto: LoginDto) {
    let existingUser;
    switch(type){
      case 'recruiter': 
        existingUser = await this.recruiterRepository.findOne({where: {email: loginDto.email}});
        break;
      case 'candidate': 
        existingUser = await this.candidateRepository.findOne({where: {email: loginDto.email}})
        break;
      case 'company': 
        existingUser = await this.companyRepository.findOne({where: {email: loginDto.email}})
        break;
      default: 
        throw new BadRequestException("Invalid login type");
    }
    if(!existingUser){
      throw new BadRequestException(`Not found user with email = ${loginDto.email}`)
    }
    const isPwdMatch = await brcypt.compare(loginDto.password, existingUser.password);
    console.log(existingUser.password);
    if(!isPwdMatch){
      throw new UnauthorizedException("Invalid password");
    }
    
    const payload = {
      sub: existingUser.email,
      role: type
    };
    const accessToken = this.jwtService.sign(payload) 
    return {
      accessToken,
      msg: 'Login successfully'
    }
  }
  @UseGuards(JwtAuthGuard)
  async changePwd(changePwdDTO: ChangePasswordDto, request: Request){

    
    const {roles, email} = (request as any).user;
    let existingUser;
    let repo: Repository<any>;
    switch(roles){
      case 'recruiter': 
        repo = this.recruiterRepository;
        existingUser = await this.recruiterRepository.findOne({where: {email}});
        break;
      case 'candidate': 
        repo = this.recruiterRepository;
        existingUser = await this.candidateRepository.findOne({where: {email}})
        break;
      case 'company': 
        repo = this.companyRepository;
        existingUser = await this.companyRepository.findOne({where: {email}})
        break;
      default: 
        throw new BadRequestException("Invalid login type");
    }
    const isPwdMatch = await brcypt.compare(changePwdDTO.oldPwd, existingUser.password);
    if(!isPwdMatch){
      throw new BadRequestException("Old password doesn't match")
    }
    const newHashedPwd = await PasswordHelper.hashPwd(changePwdDTO.newPwd);
    console.log(`Old hashed password ${existingUser.password}`);
    console.log(`New hashed password ${newHashedPwd}`);
    console.log(`Is equal: ${newHashedPwd === existingUser.password}`);
    
    existingUser.password = newHashedPwd;
    await repo.save(existingUser);
    console.log(existingUser);
    

    return {msg: 'Change password successfully', existingUser, newPwd: changePwdDTO.newPwd}
  }
  
  

  
}
