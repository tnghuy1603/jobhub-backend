import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { CandidateModule } from './candidate/candidate.module';
import { PaymentModule } from './payment/payment.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { IncentiveStrategyModule } from './incentive-strategy/incentive-strategy.module';
import { ContractModule } from './contract/contract.module';
import { JobDetailsModule } from './job-details/job-details.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { Enterprise } from './enterprise/entities/enterprise.entity';
import { Candidate } from './candidate/entities/candidate.entity';
import { EmployeeModule } from './employee/employee.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: {algorithm: 'HS256', expiresIn: '10min'}
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_DB,
      logging: true,
      synchronize: true,
      entities: [Enterprise, Candidate]

    }),
    EnterpriseModule,
    CandidateModule,
    PaymentModule,
    JobModule,
    ApplicationModule,
    IncentiveStrategyModule,
    ContractModule,
    JobDetailsModule,
    AuthModule,
    EmployeeModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
