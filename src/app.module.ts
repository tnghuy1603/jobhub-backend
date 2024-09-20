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
import { EmployeeModule } from './recruiter/recruiter.module';
import { JwtModule } from '@nestjs/jwt';
import { Job } from './job/entities/job.entity';
import { Recruiter } from './recruiter/entities/recruiter.entity';
import { Application } from './application/entities/application.entity';
import { SearchModule } from './search/search.module';
import { CompanyLocationModule } from './company-location/company-location.module';
import { InterviewModule } from './interview/interview.module';
import { CompanyLocation } from './company-location/entities/company-location.entity';
import { Payment } from './payment/entities/payment.entity';
import { Interview } from './interview/entities/interview.entity';
import { ResumeModule } from './resume/resume.module';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Resume } from './resume/entities/resume.entity';
import { cloudStorage } from './cloudinary/multer-cloundinary';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: {algorithm: 'HS256', expiresIn: '10h'}
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
      entities: [Company, Candidate, Job, Recruiter, Application, CompanyLocation, Payment, Interview, Resume]

    }),
    EnterpriseModule,
    CandidateModule,
    PaymentModule,
    JobModule,
    ApplicationModule,
    AuthModule,
    EmployeeModule,
    SearchModule,
    CompanyLocationModule,
    InterviewModule,
    ResumeModule,
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
