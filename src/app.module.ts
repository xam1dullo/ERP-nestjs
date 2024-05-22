import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './files/files.module';
import { CourseModule } from './courses/courses.module';
import { UserCoursesModule } from './user-course/user-course.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './users/entities/user.entity';
import { CourseEntity } from './courses/entities/course.entity';
import { UserCourseEntity } from './user-course/entities/user-course.entity';
import { FileEntity } from './files/entities/file.entity';
import { CourseFileEntity } from './course-files/entities/course-file.entity';
import { CourseFileModule } from './course-files/course-files.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        synchronize: true,
        entities: [UserEntity, CourseEntity, UserCourseEntity, FileEntity, CourseFileEntity],
      }),
      inject: [ConfigService],
    }),
    InfraModule,
    AuthModule,
    UsersModule,
    FileModule,
    CourseFileModule,
    CourseModule,
    UserCoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
