import { Test, TestingModule } from '@nestjs/testing';
import { JobDetailsService } from './job-details.service';

describe('JobDetailsService', () => {
  let service: JobDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobDetailsService],
    }).compile();

    service = module.get<JobDetailsService>(JobDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
