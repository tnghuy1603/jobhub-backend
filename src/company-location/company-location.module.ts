import { Module } from '@nestjs/common';
import { CompanyLocationService } from './company-location.service';
import { CompanyLocationController } from './company-location.controller';

@Module({
  controllers: [CompanyLocationController],
  providers: [CompanyLocationService],
})
export class CompanyLocationModule {}
