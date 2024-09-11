import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { Repository } from 'typeorm';
import { PaginationHelper } from 'src/helper/pagination.helper';
import { PasswordHelper } from 'src/helper/password.helper';


@Injectable()
export class CandidateService {
  constructor(@InjectRepository(Candidate) private readonly candidateRepository: Repository<Candidate>){}
  async register(createCandidateDto: CreateCandidateDto) {
    const hashedPwd = await PasswordHelper.hashPwd(createCandidateDto.password);
    const candidateToCreate = {...createCandidateDto, password: hashedPwd};
    return this.candidateRepository.save(candidateToCreate);
  }

  async findAll(page: number, limit: number) {
    return await PaginationHelper.paginate(this.candidateRepository, {}, page, limit);
  }

  async findOne(id: number) {
    const existingCandidate = await this.candidateRepository.findOne({where: {id}});
    if(!existingCandidate){
      throw new NotFoundException("Candidate not found");
    }
    return existingCandidate;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
