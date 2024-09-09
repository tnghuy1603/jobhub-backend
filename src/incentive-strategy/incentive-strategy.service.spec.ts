import { Test, TestingModule } from '@nestjs/testing';
import { IncentiveStrategyService } from './incentive-strategy.service';

describe('IncentiveStrategyService', () => {
  let service: IncentiveStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncentiveStrategyService],
    }).compile();

    service = module.get<IncentiveStrategyService>(IncentiveStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
