import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Candidate } from 'src/candidate/entities/candidate.entity';
import { CandidateModule } from 'src/candidate/candidate.module';
import { EnterpriseModule } from 'src/company/company.module';
import { EmployeeModule } from 'src/recruiter/recruiter.module';
import { JwtStrategy } from './jwt.strategy';
import { Company } from 'src/company/entities/company.entity';
import { Recruiter } from 'src/recruiter/entities/recruiter.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([Recruiter, Candidate, Company]), CandidateModule, EnterpriseModule, EmployeeModule ]
})
export class AuthModule {}
