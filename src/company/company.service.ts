import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from 'src/helper/password.helper';
import { ChangeStatusDto } from './dto/change-status.dto';
import { PaginationHelper } from 'src/helper/pagination.helper';


@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private readonly companyRepository: Repository<Company>)
  {}
  
  
  async register(createCompanyDto: CreateCompanyDto): Promise<Company>{
    const existingCompany = await this.companyRepository.findOne({where: {email: createCompanyDto.email}});
    if(existingCompany){
      throw new BadRequestException("Email is already in use");
    }
    const hashedPwd = await PasswordHelper.hashPwd(createCompanyDto.password);
    const company = {
      ...createCompanyDto,
      name: createCompanyDto.companyName,
      password: hashedPwd
    }
    return this.companyRepository.save(company);
  }
  async changeStatus(id: number, changeStatusDto: ChangeStatusDto){
    const existingEnterprise = await this.companyRepository.findOne({where: {id}});
    existingEnterprise.status = changeStatusDto.status;
    return this.companyRepository.save(existingEnterprise);
  }

  async findAll(status: string, page: number, limit: number) {
    if(status){
      return await PaginationHelper.paginate(this.companyRepository, {status}, page, limit );
    }
    return await PaginationHelper.paginate(this.companyRepository, {}, page, limit);
    
  }

  async findOne(id: number) {
    const existingEnterprise =  await this.companyRepository.findOne({where: {id}});
    if(!existingEnterprise){
      throw new NotFoundException("Enterprise not found");
    }
    return existingEnterprise;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    let existingEnterprise = await this.companyRepository.findOne({where: {id}});
    if(!existingEnterprise){
      throw new NotFoundException('Enterprise not found');
    }
    const enterpriseToUpdate = {...existingEnterprise, ...updateCompanyDto}
    return this.companyRepository.save(enterpriseToUpdate);
  }

}
