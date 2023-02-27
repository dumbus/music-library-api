import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import { DbService } from 'src/db/db.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { TokenPayload } from './interfaces/tokenPayload.interface';

import { UserEntity } from 'src/app/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private db: DbService, private userService: UserService) {}

  async signup(authDto: AuthDto) {
    const user = await this.userService.create(authDto);

    return user;
  }

  async login(authDto: AuthDto) {
    const { login, password } = authDto;

    const user = await this.db.users.findOne({ where: { login } });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (await compare(password, user.password)) {
      return this.generateTokens(user);
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const { refreshToken } = refreshTokenDto;

      if (!refreshToken) {
        console.log('no refresh token');
      }

      const decodedPayload = verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_KEY,
      ) as TokenPayload;

      const user = await this.db.users.findOne({
        where: { id: decodedPayload.userId },
      });

      if (!user) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      const tokens = this.generateTokens(user);

      return tokens;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  generateTokens(user: UserEntity) {
    const payload = { userId: user.id, login: user.login };

    const accessToken = sign(payload, process.env.JWT_SECRET_AUTH_KEY, {
      expiresIn: process.env.TOKEN_AUTH_EXPIRE_TIME,
    });
    const refreshToken = sign(payload, process.env.JWT_SECRET_REFRESH_KEY, {
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
