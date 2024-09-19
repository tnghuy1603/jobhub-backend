import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateRecruiterDto } from './create-recruiter.dto';
import { IsOptional } from 'class-validator';

export class UpdateRecruiterDto extends PartialType(OmitType(CreateRecruiterDto, ['password', 'companyId'])) {
    @IsOptional()
    isActive: boolean;
}
