import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { QueryFailedError, Repository, TypeORMError } from 'typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from 'src/helper/password.helper';
import { ChangeStatusDto } from './dto/change-status.dto';
import { PaginationHelper } from 'src/helper/pagination.helper';


@Injectable()
export class EnterpriseService {
  constructor(@InjectRepository(Enterprise) private readonly enterpriseRepository: Repository<Enterprise>)
  {}
  
  
  async register(createEnterpriseDto: CreateEnterpriseDto): Promise<Enterprise>{
    const existingEnterprise = await this.enterpriseRepository.findOne({where: {email: createEnterpriseDto.email}});
    if(existingEnterprise){
      throw new BadRequestException("Email is already in use");
    }
    const hashedPwd = await PasswordHelper.hashPwd(createEnterpriseDto.password);
    const enterpriseToCreate = {
      ...createEnterpriseDto,
      name: createEnterpriseDto.companyName,
      password: hashedPwd
    }
    return this.enterpriseRepository.save(enterpriseToCreate);
  }
  async changeStatus(id: number, changeStatusDto: ChangeStatusDto){
    const existingEnterprise = await this.enterpriseRepository.findOne({where: {id}});
    existingEnterprise.status = changeStatusDto.status;
    return this.enterpriseRepository.save(existingEnterprise);
  }

  async findAll(status: string, page: number, limit: number) {
    if(status){
      return await PaginationHelper.paginate(this.enterpriseRepository, {status}, page, limit );
    }
    return await PaginationHelper.paginate(this.enterpriseRepository, {}, page, limit);
    
  }

  async findOne(id: number) {
    const existingEnterprise =  await this.enterpriseRepository.findOne({where: {id}});
    if(!existingEnterprise){
      throw new NotFoundException("Enterprise not found");
    }
    return existingEnterprise;
  }

  async update(id: number, updateEnterpriseDto: UpdateEnterpriseDto) {
    let existingEnterprise = await this.enterpriseRepository.findOne({where: {id}});
    if(!existingEnterprise){
      throw new NotFoundException('Enterprise not found');
    }
    const enterpriseToUpdate = {...existingEnterprise, ...updateEnterpriseDto}
    return this.enterpriseRepository.save(enterpriseToUpdate);
  }

}
