import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourseEntity } from './entities/user-course.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserCourseService } from './user-course.service';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { UserCoursesController } from './user-course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UserCourseEntity, UserEntity])],
  controllers: [UserCoursesController],
  providers: [UserCourseService],
})
export class UserCoursesModule { }
