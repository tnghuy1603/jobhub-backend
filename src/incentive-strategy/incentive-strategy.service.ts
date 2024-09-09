import { Injectable } from '@nestjs/common';
import { CreateIncentiveStrategyDto } from './dto/create-incentive-strategy.dto';
import { UpdateIncentiveStrategyDto } from './dto/update-incentive-strategy.dto';

@Injectable()
export class IncentiveStrategyService {
  create(createIncentiveStrategyDto: CreateIncentiveStrategyDto) {
    return 'This action adds a new incentiveStrategy';
  }

  findAll() {
    return `This action returns all incentiveStrategy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incentiveStrategy`;
  }

  update(id: number, updateIncentiveStrategyDto: UpdateIncentiveStrategyDto) {
    return `This action updates a #${id} incentiveStrategy`;
  }

  remove(id: number) {
    return `This action removes a #${id} incentiveStrategy`;
  }
}
