import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { DeleteResult } from 'typeorm';
import { CourseFileService } from './course-files.service';
import { CreateCourseFileDto } from './dto/create-course-file.dto';

@Controller('set-course-file')
export class CourseFileController {
  constructor(
    private readonly courseFileService: CourseFileService
  ) { }

  @Post()
  async setCourseFile(@Body() createCourseFileDto: CreateCourseFileDto) {
    return this.courseFileService.setCourseFile(createCourseFileDto);
  }

  @Get(':courseId')
  async getCourseFiles(@Param('courseId') courseId: number) {
    return this.courseFileService.getCourseFiles(courseId);
  }

  @Delete(':fileId/course/:courseId')
  async deleteCourseFile(@Param('fileId') fileId: number, @Param('courseId') courseId: number): Promise<DeleteResult> {
    return this.courseFileService.deleteCourseFile(fileId, courseId);
  }
}
