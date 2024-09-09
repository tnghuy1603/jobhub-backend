import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncentiveStrategyService } from './incentive-strategy.service';
import { CreateIncentiveStrategyDto } from './dto/create-incentive-strategy.dto';
import { UpdateIncentiveStrategyDto } from './dto/update-incentive-strategy.dto';

@Controller('incentive-strategy')
export class IncentiveStrategyController {
  constructor(private readonly incentiveStrategyService: IncentiveStrategyService) {}

  @Post()
  create(@Body() createIncentiveStrategyDto: CreateIncentiveStrategyDto) {
    return this.incentiveStrategyService.create(createIncentiveStrategyDto);
  }

  @Get()
  findAll() {
    return this.incentiveStrategyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incentiveStrategyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncentiveStrategyDto: UpdateIncentiveStrategyDto) {
    return this.incentiveStrategyService.update(+id, updateIncentiveStrategyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incentiveStrategyService.remove(+id);
  }
}
