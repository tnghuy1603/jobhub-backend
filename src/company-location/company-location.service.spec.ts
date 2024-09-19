import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLocationService } from './company-location.service';

describe('CompanyLocationService', () => {
  let service: CompanyLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyLocationService],
    }).compile();

    service = module.get<CompanyLocationService>(CompanyLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
