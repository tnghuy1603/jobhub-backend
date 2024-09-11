import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Query("type") type: string, @Body() loginDto: LoginDto,) {
    return this.authService.login(type,loginDto);
  }

}
