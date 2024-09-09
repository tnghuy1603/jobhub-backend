import { PartialType } from '@nestjs/mapped-types';
import { CreateIncentiveStrategyDto } from './create-incentive-strategy.dto';

export class UpdateIncentiveStrategyDto extends PartialType(CreateIncentiveStrategyDto) {}
