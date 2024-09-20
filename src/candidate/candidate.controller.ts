import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';

@Controller('api/v1/candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post()
  async create(@Body() createCandidateDto: CreateCandidateDto) {
    return await this.candidateService.register(createCandidateDto);
  }

  @Get()
  async findAll(@Query("page") page: number = 1,
          @Query("limit") limit: number = 10) {
    return await this.candidateService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidateService.update(+id, updateCandidateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidateService.remove(+id);
  }
}
