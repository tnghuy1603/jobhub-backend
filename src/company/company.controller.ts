import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, Query, ValidationPipe, UseGuards, Req, DefaultValuePipe } from '@nestjs/common';
import {CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/helper/decorator/role.decorator';
import { UserRole } from 'src/helper/enum/role.enum';
import { RoleGuard } from 'src/helper/guards/role.guard';
import { Request } from 'express';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCompanyDto: CreateCompanyDto) {
    return this.companyService.register(createCompanyDto);
  }

  @Get()
  findAll(@Query('status') status: string,
          @Query("page", new DefaultValuePipe(1)) page: number,
          @Query("limit", new DefaultValuePipe(10)) limit: number, ) {
    return this.companyService.findAll(status, page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Roles(UserRole.COMPANY, UserRole.CANDIDATE)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('secured-endpoint/test')
  getSecuredEndpoint(@Req() request: Request){
    console.log(`Users after authenticated ${request.user}`)
    return "Bypassed"
  }

}
