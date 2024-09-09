import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobDetailsService } from './job-details.service';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';

@Controller('job-details')
export class JobDetailsController {
  constructor(private readonly jobDetailsService: JobDetailsService) {}

  @Post()
  create(@Body() createJobDetailDto: CreateJobDetailDto) {
    return this.jobDetailsService.create(createJobDetailDto);
  }

  @Get()
  findAll() {
    return this.jobDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDetailDto: UpdateJobDetailDto) {
    return this.jobDetailsService.update(+id, updateJobDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobDetailsService.remove(+id);
  }
}
