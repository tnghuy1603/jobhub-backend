import { Module } from '@nestjs/common';
import { IncentiveStrategyService } from './incentive-strategy.service';
import { IncentiveStrategyController } from './incentive-strategy.controller';

@Module({
  controllers: [IncentiveStrategyController],
  providers: [IncentiveStrategyService],
})
export class IncentiveStrategyModule {}
