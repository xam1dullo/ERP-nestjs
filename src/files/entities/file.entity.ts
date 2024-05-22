import { CourseFileEntity } from 'src/course-files/entities/course-file.entity';
import { CourseEntity } from 'src/courses/entities/course.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  path: string;


  @ManyToOne(() => UserEntity, user => user.files)
  user: UserEntity


  @ManyToOne(() => CourseEntity, course => course.files)
  @JoinTable()
  courses: CourseEntity[]

  @OneToMany(() => CourseFileEntity, courseFile => courseFile.file)
  courseFiles: CourseFileEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
