import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { CandidateModule } from './candidate/candidate.module';
import { PaymentModule } from './payment/payment.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { IncentiveStrategyModule } from './incentive-strategy/incentive-strategy.module';
import { ContractModule } from './contract/contract.module';
import { JobDetailsModule } from './job-details/job-details.module';

@Module({
  imports: [UserModule, EnterpriseModule, CandidateModule, PaymentModule, JobModule, ApplicationModule, IncentiveStrategyModule, ContractModule, JobDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
