import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';

@Module({
  controllers: [CandidateController],
  providers: [CandidateService],
  imports: [TypeOrmModule.forFeature([Candidate])],
  exports: [CandidateService]
})
export class CandidateModule {}
