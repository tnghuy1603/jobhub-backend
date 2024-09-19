import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { SearchModule } from 'src/search/search.module';
import { Company } from 'src/company/entities/company.entity';
import { CompanyLocationModule } from 'src/company-location/company-location.module';
import { CompanyLocation } from 'src/company-location/entities/company-location.entity';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [TypeOrmModule.forFeature([Job, Company, CompanyLocation]), SearchModule, CompanyLocationModule]
})
export class JobModule {}
