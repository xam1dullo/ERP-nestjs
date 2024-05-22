import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseEntity } from './entities/course.entity';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post()
  async addCourse(@Body() body: { title: string, description: string }): Promise<CourseEntity | undefined> {
    return this.courseService.create(body.title, body.description);
  }

  @Get()
  async listCourses() {
    return this.courseService.findAll();
  }

  @Get(':id')
  async getCourse(@Param('id') id: number) {
    return this.courseService.findOne(id);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: number) {
    return this.courseService.delete(id);
  }

  @Put(':id')
  async updateCourse(@Param('id') id: number, @Body() body: { title: string }) {
    return this.courseService.update(id, body.title);
  }
}

