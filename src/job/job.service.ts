import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { PaginationHelper } from 'src/helper/pagination.helper';

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>){}
  async createNewJob(createJobDto: CreateJobDto) {
    return 'This action adds a new job';
  }

  async findAll(status: string, page: number, limit: number) {
    if(status){
      return PaginationHelper.paginate(this.jobRepository, {status}, page, limit);
    }
    return PaginationHelper.paginate(this.jobRepository, {}, page, limit);
  }

  async findOne(id: number): Promise<Job> {
    const existingJob = await this.jobRepository.findOne({where: {id}});
    if(!existingJob){
      throw new NotFoundException('Job not found');
    }
    return existingJob;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }
  async searchJob(query: string, location: string){
    
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
