import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Candidate } from 'src/candidate/entities/candidate.entity';
import { Enterprise } from 'src/company/entities/enterprise.entity';
import { CandidateService } from 'src/candidate/candidate.service';
import { EnterpriseService } from 'src/company/company.service';
import { CandidateModule } from 'src/candidate/candidate.module';
import { EnterpriseModule } from 'src/company/company.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([Employee, Candidate, Enterprise]), CandidateModule, EnterpriseModule, EmployeeModule ]
})
export class AuthModule {}
