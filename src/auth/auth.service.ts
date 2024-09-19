import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from 'src/candidate/entities/candidate.entity';
import { Repository } from 'typeorm';


import * as brcypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Company } from 'src/company/entities/company.entity';
import { Recruiter } from 'src/recruiter/entities/recruiter.entity';

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
  async changePwd(){
    
  }

  
}
