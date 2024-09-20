import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResumeService {
  constructor(private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(Resume) resumeRepository: Repository<Resume>
  ){
    
  }
  async create(createResumeDto: CreateResumeDto, resume: Express.Multer.File) {
    if(!resume){
      throw new BadRequestException("Resume is not provided");
    };
    console.log(`Resume: ${resume.originalname} currently:  ${resume.filename}`);
    
    await this.cloudinaryService.uploadFile(resume);
    
    
  }

  findAll() {
    return `This action returns all resume`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resume`;
  }

  update(id: number, updateResumeDto: UpdateResumeDto) {
    return `This action updates a #${id} resume`;
  }

  remove(id: number) {
    return `This action removes a #${id} resume`;
  }
}
