import { Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';

@Injectable()
export class JobDetailsService {
  create(createJobDetailDto: CreateJobDetailDto) {
    return 'This action adds a new jobDetail';
  }

  findAll() {
    return `This action returns all jobDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobDetail`;
  }

  update(id: number, updateJobDetailDto: UpdateJobDetailDto) {
    return `This action updates a #${id} jobDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobDetail`;
  }
}
