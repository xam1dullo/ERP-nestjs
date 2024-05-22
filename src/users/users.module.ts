import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class UsersModule { }


