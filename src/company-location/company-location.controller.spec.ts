import { Test, TestingModule } from '@nestjs/testing';
import { CompanyLocationController } from './company-location.controller';
import { CompanyLocationService } from './company-location.service';

describe('CompanyLocationController', () => {
  let controller: CompanyLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyLocationController],
      providers: [CompanyLocationService],
    }).compile();

    controller = module.get<CompanyLocationController>(CompanyLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
