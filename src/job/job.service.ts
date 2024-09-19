import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { PaginationHelper } from 'src/helper/pagination.helper';

import { SearchService } from 'src/search/search.service';
import { Company } from 'src/company/entities/company.entity';
import { CompanyLocation } from 'src/company-location/entities/company-location.entity';

@Injectable()
export class JobService {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>,
              @InjectRepository(CompanyLocation) private readonly companyLocationRepository: Repository<CompanyLocation>,
              private readonly searchService: SearchService){}
              
  async createNewJob(createJobDto: CreateJobDto) {
    const companyLocation = await this.companyLocationRepository.findOne({where: {id: createJobDto.companyLocationId}});
    if(!companyLocation){
      throw new BadRequestException("No company location with id = " + createJobDto.companyLocationId)
    }

    
    const job = {
      jobTitle: createJobDto.jobTitle,
      jobDescription: createJobDto.jobDescription,
      postedDate: new Date(createJobDto.postedDate),
      employmentType: createJobDto.employmentType,
      salaryRange: createJobDto.salaryRange,
      postFee: createJobDto.postFee,
      companyLocation 
    }
    const savedJob = await this.jobRepository.save(job)
    const doc =  {
        id: savedJob.id,
        jobTitle: savedJob.jobTitle,
        jobDescription: savedJob.jobDescription,
        postedDate: savedJob.postedDate,
        employmentType: savedJob.employmentType,
        salaryRange: savedJob.salaryRange,
        status: savedJob.status,
        postFee: savedJob.postFee,
        enterprise: savedJob.workplace.id
      }
    
    this.searchService.indexDocument(savedJob.id.toString(), 'jobs', doc)
    return savedJob;
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
    return await this.searchService.searchMutilFields('jobs', ['jobTitle', 'jobDescription'], query, {})
  }

  
}
