import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { UserCourseEntity } from 'src/user-course/entities/user-course.entity';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, UserCourseEntity])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule { }

