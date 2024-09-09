import { Module } from '@nestjs/common';
import { JobDetailsService } from './job-details.service';
import { JobDetailsController } from './job-details.controller';

@Module({
  controllers: [JobDetailsController],
  providers: [JobDetailsService],
})
export class JobDetailsModule {}
