import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>

  ) { }


  async uploadFile(createFileDto: CreateFileDto): Promise<FileEntity> {
    const file = this.fileRepository.create({
      filename: createFileDto.filename,
      path: createFileDto.path,
      user: { id: createFileDto.userId },
    });

    return this.fileRepository.save(file);
  }

  async listFiles(userId: number, page: number = 1, limit: number = 10): Promise<{ data: FileEntity[]; total: number }> {
    const [data, total] = await this.fileRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }
  async getFile(fileId: number): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  async deleteFile(fileId: number): Promise<DeleteResult> {
    const result = await this.fileRepository.delete(fileId);
    if (result.affected === 0) {
      throw new NotFoundException('File not found');
    }
    return result
  }

  async updateFile(fileId: number, updateFileDto: UpdateFileDto): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    file.filename = updateFileDto.filename;
    return this.fileRepository.save(file);
  }

  async downloadFile(fileId: number): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }


  async setCourseFile(fileId: number, courseId: number): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({ where: { id: fileId }, relations: ['courses'] });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    file.courses.push(course);
    return this.fileRepository.save(file);
  }

  async getCourseFiles(courseId: number): Promise<FileEntity[]> {
    const course = await this.courseRepository.findOne({ where: { id: courseId }, relations: ['files'] });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course.files;
  }

  async deleteCourseFile(fileId: number, courseId: number): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { id: fileId }, relations: ['courses'] });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    file.courses = file.courses.filter(course => course.id !== courseId);
    await this.fileRepository.save(file);
  }
}

