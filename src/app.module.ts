import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EnterpriseModule } from './company/company.module';
import { CandidateModule } from './candidate/candidate.module';
import { PaymentModule } from './payment/payment.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { Company } from './company/entities/company.entity';
import { Candidate } from './candidate/entities/candidate.entity';
import { EmployeeModule } from './employee/employee.module';
import { JwtModule } from '@nestjs/jwt';
import { Job } from './job/entities/job.entity';
import { Employee } from './employee/entities/employee.entity';
import { Application } from './application/entities/application.entity';
import { SearchModule } from './search/search.module';

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
      entities: [Company, Candidate, Job, Employee, Application]

    }),
    EnterpriseModule,
    CandidateModule,
    PaymentModule,
    JobModule,
    ApplicationModule,
    AuthModule,
    EmployeeModule,
    SearchModule,

    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
