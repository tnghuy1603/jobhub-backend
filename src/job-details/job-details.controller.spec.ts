import { Test, TestingModule } from '@nestjs/testing';
import { JobDetailsController } from './job-details.controller';
import { JobDetailsService } from './job-details.service';

describe('JobDetailsController', () => {
  let controller: JobDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobDetailsController],
      providers: [JobDetailsService],
    }).compile();

    controller = module.get<JobDetailsController>(JobDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
