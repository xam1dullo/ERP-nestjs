import { FileEntity } from 'src/files/entities/file.entity';
import { UserCourseEntity } from 'src/user-course/entities/user-course.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => FileEntity, file => file.user)
  files: FileEntity[];

  @OneToMany(() => UserCourseEntity, userCourse => userCourse.user)
  userCourses: UserCourseEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

