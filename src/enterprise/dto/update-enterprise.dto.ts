import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateEnterpriseDto } from './create-enterprise.dto';

export class UpdateEnterpriseDto extends PartialType(
    OmitType(CreateEnterpriseDto, ['taxNumber', 'username', 'password'] as const),
  ) {}