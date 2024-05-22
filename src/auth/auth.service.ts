import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { compare } from "bcrypt"
import { UsersService } from "../users/users.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { REDIS } from "src/infra/databases/redis/constants/redis";
import { Redis } from "ioredis";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
  constructor(
    @Inject(REDIS) private readonly redis: Redis,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

  ) { }

  async signIn(login: string, password: string) {

    const user = await this.usersService.findOneBy(login);

    console.log(user, { login, password })

    if (await compare(user.password, password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, login: user.login };

    const accessToken = this.jwtService.sign(payload, {

      secret: this.configService.get<string>('JWT_SECRET', 'defaultSecret'),
      expiresIn: `${this.configService.get<number>('JWT_EXPIRATION', 600)}s`,
    });

    const expiration = parseInt(this.configService.get<string>('JWT_EXPIRATION', '600'), 10); // Ensure it's an integer
    await this.redis.set(`token:${user.id}`, accessToken, 'EX', expiration);
    return {
      accessToken
    };
  }

  async signUp(payload: CreateUserDto) {
    const user = await this.usersService.create(payload);
    return user;
  }

  async logOut(token: string) {
    // TODO: Implement terminate token from Redis
    await this.redis.del(`token:${token}`);

    const user = {
      "message": "Logout successful"
    }

    return user;
  }

  async validateToken(token: string): Promise<any> {
    const payload = this.jwtService.verify(token);
    const storedToken = await this.redis.get(`token:${payload.sub}`);

    if (storedToken !== token) {
      throw new UnauthorizedException();
    }

    return payload;
  }

}

