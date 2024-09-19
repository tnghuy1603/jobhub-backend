import { Module } from '@nestjs/common';
import { CompanyLocationService } from './company-location.service';
import { CompanyLocationController } from './company-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyLocation } from './entities/company-location.entity';
import { Company } from 'src/company/entities/company.entity';

@Module({
  controllers: [CompanyLocationController],
  providers: [CompanyLocationService],
  imports: [TypeOrmModule.forFeature([CompanyLocation, Company])]
})
export class CompanyLocationModule {}
