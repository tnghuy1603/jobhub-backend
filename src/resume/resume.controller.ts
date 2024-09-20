import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudStorage, diskStorage } from 'src/cloudinary/multer-cloundinary';
import { pdfFileFilter } from 'src/cloudinary/file-filter';
import multer from 'multer';

@Controller('api/v1/resumes')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}
  
  @Post()
  @UseInterceptors(FileInterceptor('resume', {
    storage: diskStorage
    
  }))
  create(@Body() createResumeDto: CreateResumeDto,
        @UploadedFile(new ParseFilePipe({validators: [new FileTypeValidator({fileType: 'application/pdf'})]})) resume: Express.Multer.File) {
    return this.resumeService.create(createResumeDto, resume);
  } 
  
  

  @Get()
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
