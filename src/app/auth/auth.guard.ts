import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';

const noAuthRoutes = ['', 'auth', 'doc', 'error'];

@Injectable()
export class CustomAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const currentRoute = request.url.split('/')[1];
    if (noAuthRoutes.includes(currentRoute)) {
      return true;
    }

    const authHeaders = request.headers['authorization'].split(' ');
    if (!authHeaders.length) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const authScheme = authHeaders[0];
    if (authScheme !== 'Bearer') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const authToken = authHeaders[1];
    try {
      verify(authToken, process.env.JWT_SECRET_AUTH_KEY);

      return true;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
