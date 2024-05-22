import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { UserCourseService } from './user-course.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';

@Controller('set-user-course')
export class UserCoursesController {
  constructor(
    private readonly userCourseService: UserCourseService
  ) { }

  @Post()
  async setUserCourse(@Req() req: Record<string, any>, @Body() createUserCourseDto: CreateUserCourseDto) {
    const user = req.user
    console.log({ user })
    return this.userCourseService.create({ userId: user['sub'], ...createUserCourseDto });
  }

  @Get(':userId')
  async getUserCourses(@Param('userId') userId: number) {
    return this.userCourseService.find(userId);
  }

  @Delete(':courseId/user/:userId')
  async deleteUserCourse(@Param('userId') userId: number, @Param('courseId') courseId: number) {
    return this.userCourseService.delete(userId, courseId);
  }
}
