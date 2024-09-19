import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, Query } from '@nestjs/common';
import { CompanyLocationService } from './company-location.service';
import { CreateCompanyLocationDto } from './dto/create-company-location.dto';
import { UpdateCompanyLocationDto } from './dto/update-company-location.dto';

@Controller('/api/v1/company-locations')
export class CompanyLocationController {
  constructor(private readonly companyLocationService: CompanyLocationService) {}

  @Post()
  create(@Body() createCompanyLocationDto: CreateCompanyLocationDto) {
    return this.companyLocationService.create(createCompanyLocationDto);
  }

  @Get()
  findAll(@Query("page", new DefaultValuePipe(1)) page: number,
          @Query("limit", new DefaultValuePipe(10)) limit: number,
          @Query("company") company?: number,) {
    return this.companyLocationService.findAll(company, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyLocationDto: UpdateCompanyLocationDto) {
    return this.companyLocationService.update(+id, updateCompanyLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyLocationService.remove(+id);
  }
}
