import { CourseEntity } from 'src/courses/entities/course.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('course_file')
export class CourseFileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FileEntity, file => file.courseFiles, { onDelete: 'CASCADE' })
  file: FileEntity;

  @ManyToOne(() => CourseEntity, course => course.files, { onDelete: 'CASCADE' })
  course: CourseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


