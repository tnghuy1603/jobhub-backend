import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, Query, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import {CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/helper/decorator/role.decorator';
import { UserRole } from 'src/helper/enum/role.enum';
import { RoleGuard } from 'src/helper/guards/role.guard';
import { Request } from 'express';

@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCompanyDto: CreateCompanyDto) {
    return this.companyService.register(createCompanyDto);
  }

  // @Get()
  // findAll(@Query('status') status: string,
  //         @Query("page") page: number = 1,
  //         @Query("limit") limit: number = 10 ) {
  //   return this.companyService.findAll(status, page, limit);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.companyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
  //   return this.companyService.update(+id, updateEnterpriseDto);
  // }
  // @Put(':id')
  // updateEnterpriseStatus(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) changeStatusDto: ChangeStatusDto){
  //   return this.companyService.changeStatus(id, changeStatusDto)
  // }
  @Roles(UserRole.ENTERPRISE, UserRole.CANDIDATE)
  @UseGuards(RoleGuard)
  @Get('secured-endpoint')
  getSecuredEndpoint(@Req() request: Request){
    console.log(`Users after authenticated ${request.user}`)
    return request.user
  }

}
