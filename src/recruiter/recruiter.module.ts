import { Module } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { RecruiterController } from './recruiter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  controllers: [RecruiterController],
  providers: [RecruiterService],
  imports: [TypeOrmModule.forFeature([Recruiter, Company])],
  exports: [RecruiterService]
})
export class EmployeeModule {}
