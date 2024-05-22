import { CourseEntity } from 'src/courses/entities/course.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserCourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.userCourses, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => CourseEntity, course => course.userCourses, { onDelete: 'CASCADE' })
  course: CourseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

