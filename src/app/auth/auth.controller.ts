import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() authDto: AuthDto) {
    return await this.authService.signup(authDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }

  @Post('refresh')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: () => {
        return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      },
    }),
  )
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refresh(refreshTokenDto);
  }
}
