import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('/api/v1/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.createNewJob(createJobDto);
  }

  @Get()
  findAll(@Query() status: string,
          @Query("page", new DefaultValuePipe(10), ParseIntPipe) page: number,
          @Query("limit", new DefaultValuePipe(3), ParseIntPipe) limit: number) {
    return this.jobService.findAll(status, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  
}
