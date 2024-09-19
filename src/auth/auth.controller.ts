import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Res, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Query("type") type: string, @Body() loginDto: LoginDto,) {
    return this.authService.login(type,loginDto);
  }
  @Put('change-pwd')
  @UseGuards(JwtAuthGuard)
  async changePwd(@Body() changePwdDTO: ChangePasswordDto, @Req() request: Request){
    return this.authService.changePwd(changePwdDTO, request)
  }
  

}
