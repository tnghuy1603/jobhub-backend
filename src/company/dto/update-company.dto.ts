import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-company.dto';
import { IsIn, IsString, IsEnum, IsOptional } from 'class-validator';
import { CompanyStatus } from '../entities/company.entity';

export class UpdateCompanyDto extends PartialType(
    OmitType(CreateCompanyDto, ['taxNumber', 'password'] as const),
  ) {
    @IsOptional()
    @IsString()
    @IsEnum(CompanyStatus, {message: 'Status must be either pending or activated'})
    status?: CompanyStatus;
  }