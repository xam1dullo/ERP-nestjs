import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { Repository } from 'typeorm';
import { CourseFileEntity } from './entities/course-file.entity';
import { CreateCourseFileDto } from './dto/create-course-file.dto';

@Injectable()
export class CourseFileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(CourseFileEntity)
    private courseFileRepository: Repository<CourseFileEntity>
  ) { }

  async setCourseFile(createCourseFileDto: CreateCourseFileDto): Promise<CourseFileEntity> {
    const file = await this.fileRepository.findOne({ where: { id: createCourseFileDto.fileId } });
    console.log(file)

    if (!file) {
      throw new NotFoundException('File not found');
    }

    const course = await this.courseRepository.findOne({ where: { id: createCourseFileDto.courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const courseFile = this.courseFileRepository.create({
      file,
      course,
    });

    return this.courseFileRepository.save(courseFile);
  }

  async getCourseFiles(courseId: number): Promise<FileEntity[]> {
    const courseFiles = await this.courseFileRepository.find({ where: { course: { id: courseId } }, relations: ['file'] });
    console.log(courseFiles)
    if (courseFiles.length === 0) {
      throw new NotFoundException('No files found for this course');
    }
    return courseFiles.map(courseFile => courseFile.file);
  }

  async deleteCourseFile(fileId: number, courseId: number): Promise<any> {
    const courseFile = await this.courseFileRepository.findOne({ where: { file: { id: fileId }, course: { id: courseId } } });
    if (!courseFile) {
      throw new NotFoundException('Course file relationship not found');
    }

    const result = await this.courseFileRepository.remove(courseFile);
    return result
  }
}

