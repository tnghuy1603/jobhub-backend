import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from 'src/helper/password.helper';
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
    const savedCompany = await this.companyRepository.save(company);
    delete savedCompany.password;
    return savedCompany;
  }

  async findAll(status: string, page: number, limit: number) {
    if(status){
      return await PaginationHelper.paginate(this.companyRepository, {status}, page, limit );
    }
    return await PaginationHelper.paginate(this.companyRepository, {}, page, limit);
    
  }

  async findOne(id: number) {
    const existingCompany =  await this.companyRepository.findOne({where: {id}});
    if(!existingCompany){
      throw new NotFoundException("Enterprise not found");
    }
    return existingCompany;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    let existingCompany = await this.companyRepository.findOne({where: {id}});
    if(!existingCompany){
      throw new NotFoundException('Enterprise not found');
    }
    const company = {...existingCompany, ...updateCompanyDto}
    
    const savedCompany = await this.companyRepository.save(company);
    delete savedCompany.password;
    return savedCompany;
  }

}
