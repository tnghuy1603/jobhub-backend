import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
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

  findAll(companyId: number, page: number, limit: number) {
    if(companyId){
      return PaginationHelper.paginate(this.recruiterRepository, {companyId}, page, limit)
    }
    return PaginationHelper.paginate(this.recruiterRepository, {}, page, limit)
  }

  findOne(id: number) {
    return ''
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
