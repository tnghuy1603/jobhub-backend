import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterDto } from './create-employee.dto';
import { IsOptional } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(OmitType(CreateRecruiterDto, ['password', 'companyId'])) {
    @IsOptional()
    isActive: boolean;
}
