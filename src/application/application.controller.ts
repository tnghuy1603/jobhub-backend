import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { RoleGuard } from 'src/helper/guards/role.guard';
import { Roles } from 'src/helper/decorator/role.decorator';
import { UserRole } from 'src/helper/enum/role.enum';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @Roles(UserRole.CANDIDATE)
  @UseGuards(RoleGuard)
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  };

  @Get()
  @Roles(UserRole.RECRUITER)
  @UseGuards(RoleGuard)
  findAll() {
    return this.applicationService.findAll();
  };

  @Get(':id')
  @Roles(UserRole.CANDIDATE, UserRole.RECRUITER)
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(+id);
  };

  @Patch(':id')
  @Roles(UserRole.CANDIDATE)
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.update(+id, updateApplicationDto);
  };
}
