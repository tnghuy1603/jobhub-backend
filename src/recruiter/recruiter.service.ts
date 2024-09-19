import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import {Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { PasswordHelper } from 'src/helper/password.helper';
import { PaginationHelper } from 'src/helper/pagination.helper';

@Injectable()
export class RecruiterService {
  constructor(@InjectRepository(Recruiter) private readonly recruiterRepository: Repository<Recruiter>,
              @InjectRepository(Company) private readonly companyRepository: Repository<Company>){}
  async create(createRecruiterDto: CreateRecruiterDto) {
    const existingCompany = await this.companyRepository.findOne({where: {id: createRecruiterDto.companyId}});
    if(!existingCompany){
      throw new NotFoundException("Company not found");
    }
    const hashedPwd = await PasswordHelper.hashPwd(createRecruiterDto.password);
    delete createRecruiterDto.companyId;
    const recruiter = this.recruiterRepository.create({
      ...createRecruiterDto,
      password: hashedPwd,
      company: existingCompany
    });
    return this.recruiterRepository.save(recruiter);
  }

  async findAll(companyId: number, page: number, limit: number) {
    if(companyId){
      return await PaginationHelper.paginate(this.recruiterRepository, {company: {id: companyId}}, page, limit, null, null);
    }
    
    return await PaginationHelper.paginate(this.recruiterRepository, {}, page, limit, null, null);
  }
  

  async findOne(id: number) {
    const existingRecruiter = await this.recruiterRepository.findOne({where: {id}});
    if(!existingRecruiter){
      throw new NotFoundException("Recruiter not found")
    }
    return existingRecruiter;
  }

  async update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    const existingRecruiter = this.recruiterRepository.findOne({where: {id}});
    if(!existingRecruiter){
      throw new NotFoundException("Recruiter not found")
    }
    const recruiter = {...existingRecruiter, ...updateRecruiterDto};
    const updatedRecruiter = await this.recruiterRepository.save(recruiter);
    delete updatedRecruiter.password;
    return updatedRecruiter;
  }

  
}
