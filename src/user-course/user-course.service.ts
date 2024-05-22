import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { UserCourseEntity } from './entities/user-course.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserCourseDto } from './dto/create-user-course.dto';

@Injectable()
export class UserCourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(UserCourseEntity)
    private userCourseRepository: Repository<UserCourseEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) { }

  async create(createUserCourseDto: CreateUserCourseDto): Promise<UserCourseEntity> {
    const user = await this.userRepository.findOne({ where: { id: createUserCourseDto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const course = await this.courseRepository.findOne({ where: { id: createUserCourseDto.courseId } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const userCourse = this.userCourseRepository.create({
      user,
      course,
    });

    return this.userCourseRepository.save(userCourse);
  }

  async find(userId: number): Promise<UserCourseEntity[]> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userCourseRepository.find({ where: { user: { id: userId } }, relations: ['course'] });
  }

  async delete(userId: number, courseId: number): Promise<void> {
    const result = await this.userCourseRepository.delete({ user: { id: userId }, course: { id: courseId } });
    if (result.affected === 0) {
      throw new NotFoundException('UserCourse not found');
    }
  }
}

