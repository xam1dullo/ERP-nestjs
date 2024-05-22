import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from './entities/course.entity';
import { generateSlug } from 'src/common/utils/slug';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,


  ) { }

  async create(title: string, desc: string): Promise<CourseEntity> {
    const course = this.courseRepository.create({ title, description: desc, slug: generateSlug(title) });

    return this.courseRepository.save(course);

  }

  async findAll(): Promise<CourseEntity[]> {
    return this.courseRepository.find();
  }

  async findOne(courseId: number): Promise<CourseEntity> {
    return this.courseRepository.findOne({ where: { id: courseId } });
  }

  async delete(courseId: number): Promise<void> {
    await this.courseRepository.delete(courseId);
  }

  async update(courseId: number, title: string): Promise<CourseEntity> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    course.title = title;
    course.slug = generateSlug(title)
    return this.courseRepository.save(course);
  }
}

