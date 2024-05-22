import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { CourseFileEntity } from './entities/course-file.entity';
import { CourseFileService } from './course-files.service';
import { CourseFileController } from './course-files.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, CourseEntity, CourseFileEntity])],
  controllers: [CourseFileController],
  providers: [CourseFileService],
})
export class CourseFileModule { }

