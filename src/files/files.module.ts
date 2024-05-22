import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { FileService } from './files.service';
import { FileController } from './files.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity, CourseEntity])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }


