import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';

const noAuthRoutes = ['', 'doc', 'error'];

@Injectable()
export class CustomAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const splittedUrl = request.url.split('/');

    const currentRoute = splittedUrl[1];
    if (currentRoute === 'auth') {
      const currentSubroute = splittedUrl[2];

      if (currentSubroute === 'signup' || currentSubroute === 'login') {
        return true;
      }
    } else if (noAuthRoutes.includes(currentRoute)) {
      return true;
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const authHeaderParts = authHeader.split(' ');
    const authScheme = authHeaderParts[0];
    if (authScheme !== 'Bearer') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const authToken = authHeaderParts[1];
    try {
      verify(authToken, process.env.JWT_SECRET_AUTH_KEY);

      return true;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
