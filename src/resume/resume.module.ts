import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';

@Module({
  controllers: [ResumeController],
  providers: [ResumeService],
  imports: [CloudinaryModule, TypeOrmModule.forFeature([Resume])]
})
export class ResumeModule {}
