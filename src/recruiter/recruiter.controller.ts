import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe } from '@nestjs/common';
import { RecruiterService } from './recruiter.service';
import { CreateRecruiterDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles, ROLES_KEY } from 'src/helper/decorator/role.decorator';
import { RoleGuard } from 'src/helper/guards/role.guard';
import { UserRole } from 'src/helper/enum/role.enum';

@Controller('recruiters')
@UseGuards(JwtAuthGuard)
export class RecruiterController {
  constructor(private readonly recruiterService: RecruiterService) {}

  @Post()
  @Roles(UserRole.COMPANY)
  @UseGuards(RoleGuard)
  create(@Body() createRecruiterDto: CreateRecruiterDto) {
    return this.recruiterService.create(createRecruiterDto);
  }

  @Get()
  findAll(@Query("page", new DefaultValuePipe(1)) page: number, 
          @Query("limit", new DefaultValuePipe(10)) limit: number,
          @Query("company") company?: number,) {
    return this.recruiterService.findAll(company, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recruiterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.recruiterService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recruiterService.remove(+id);
  }
}
