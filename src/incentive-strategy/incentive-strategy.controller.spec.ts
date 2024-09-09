import { Test, TestingModule } from '@nestjs/testing';
import { IncentiveStrategyController } from './incentive-strategy.controller';
import { IncentiveStrategyService } from './incentive-strategy.service';

describe('IncentiveStrategyController', () => {
  let controller: IncentiveStrategyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncentiveStrategyController],
      providers: [IncentiveStrategyService],
    }).compile();

    controller = module.get<IncentiveStrategyController>(IncentiveStrategyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
