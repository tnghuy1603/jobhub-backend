import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from 'src/candidate/entities/candidate.entity';
import { Repository } from 'typeorm';
import { Enterprise } from 'src/company/entities/enterprise.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import * as brcypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>,
              @InjectRepository(Enterprise)private readonly enterpriseRepository: Repository<Enterprise>,
              @InjectRepository(Employee)private readonly employeeRepository: Repository<Employee>,
              private jwtService: JwtService
            ){}
  async login(type: string, loginDto: LoginDto) {
    let existingUser;
    switch(type){
      case 'employee': 
        existingUser = await this.employeeRepository.findOne({where: {email: loginDto.email}});
        break;
      case 'candidate': 
        existingUser = await this.candidateRepository.findOne({where: {email: loginDto.email}})
        break;
      case 'enterprise': 
        existingUser = await this.enterpriseRepository.findOne({where: {email: loginDto.email}})
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
      iat: Date.now(),
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
