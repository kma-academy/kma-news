import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Post } from './post.entity';

@Entity()
export class SavePost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @CreateDateColumn()
  savedAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  constructor(partial: Partial<SavePost>) {
    Object.assign(this, partial);
  }
}
