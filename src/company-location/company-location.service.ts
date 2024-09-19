import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyLocationDto } from './dto/create-company-location.dto';
import { UpdateCompanyLocationDto } from './dto/update-company-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLocation } from './entities/company-location.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/company/entities/company.entity';
import { PaginationHelper } from 'src/helper/pagination.helper';

@Injectable()
export class CompanyLocationService {
  constructor(@InjectRepository(CompanyLocation) private readonly companyLocationRepository: Repository<CompanyLocation>,
              @InjectRepository(Company) private readonly companyRepository: Repository<Company>){}
  async create(createCompanyLocationDto: CreateCompanyLocationDto) {
    const existingCompany = await this.companyRepository.findOne({where: {id: createCompanyLocationDto.companyId}});
    if(!existingCompany){
      throw new NotFoundException("Company not found");
    }
    delete createCompanyLocationDto.companyId;
    const companyLocation =  {
      ...createCompanyLocationDto,
      company: existingCompany
    }
    return this.companyLocationRepository.save(companyLocation)
  }

  async findAll(companyId: number, page: number, limit) {
    if(companyId){
      return await PaginationHelper.paginate(this.companyLocationRepository, {company: {id: companyId}, isDeleted: false}, page, limit, null, null);
    }
    return await PaginationHelper.paginate(this.companyLocationRepository, {isDeleted: false}, page, limit, null, null);
  }

  async findOne(id: number) {
    const existingLocation = await this.companyLocationRepository.findOne({where: {id, isDeleted: false}});
    if(!existingLocation){
      throw new NotFoundException("Location not found")
    }
    return existingLocation
  }

  update(id: number, updateCompanyLocationDto: UpdateCompanyLocationDto) {
    return `This action updates a #${id} companyLocation`;
  }
  //Soft delete
  async remove(id: number) {
    const existingLocation = await this.companyLocationRepository.findOne({where: {id, isDeleted: false}});
    if(!existingLocation){
      throw new NotFoundException("Location not found")
    }
    existingLocation.isDeleted = true;
    this.companyLocationRepository.save(existingLocation)
    return {msg: 'Location is deleted'}
  }
}
