import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, Query, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/helper/decorator/role.decorator';
import { UserRole } from 'src/helper/enum/role.enum';
import { RoleGuard } from 'src/helper/guards/role.guard';
import { Request } from 'express';

@Controller('enterprises')
@UseGuards(JwtAuthGuard)
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  create(@Body(new ValidationPipe()) createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.register(createEnterpriseDto);
  }

  // @Get()
  // findAll(@Query('status') status: string,
  //         @Query("page") page: number = 1,
  //         @Query("limit") limit: number = 10 ) {
  //   return this.enterpriseService.findAll(status, page, limit);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.enterpriseService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
  //   return this.enterpriseService.update(+id, updateEnterpriseDto);
  // }
  // @Put(':id')
  // updateEnterpriseStatus(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) changeStatusDto: ChangeStatusDto){
  //   return this.enterpriseService.changeStatus(id, changeStatusDto)
  // }
  @Roles(UserRole.ENTERPRISE, UserRole.CANDIDATE)
  @UseGuards(RoleGuard)
  @Get('secured-endpoint')
  getSecuredEndpoint(@Req() request: Request){
    console.log(`Users after authenticated ${request.user}`)
    return request.user
  }

}
