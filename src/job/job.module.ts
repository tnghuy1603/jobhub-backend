import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { SearchModule } from 'src/search/search.module';
import { Company } from 'src/company/entities/company.entity';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [TypeOrmModule.forFeature([Job, Company]), SearchModule]
})
export class JobModule {}
