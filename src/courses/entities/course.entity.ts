import { CourseFileEntity } from 'src/course-files/entities/course-file.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { UserCourseEntity } from 'src/user-course/entities/user-course.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;


  @Column()
  description: string;

  @OneToMany(() => FileEntity, file => file.courses)
  files: FileEntity[];

  @OneToMany(() => UserCourseEntity, userCourse => userCourse.course)
  userCourses: UserCourseEntity[];


  @OneToMany(() => CourseFileEntity, courseFile => courseFile.course)
  courseFiles: CourseFileEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

