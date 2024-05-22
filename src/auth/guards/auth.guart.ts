import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../strategies/public-strategy';
import { jwtConstants } from '../constants';
import { REDIS } from 'src/infra/databases/redis/constants/redis';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(REDIS) private readonly redis: Redis,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);


    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      console.log(this.configService.get<string>('JWT_SECRET', "salomlar"))

      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET', "salomlar"),

        }
      );

      const storedToken = await this.redis.get(`token:${payload.sub}`);

      console.log({ storedToken })

      if (storedToken !== token) {
        throw new UnauthorizedException();
      }

      request['user'] = payload;
    } catch (e) {
      console.error(e)
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

