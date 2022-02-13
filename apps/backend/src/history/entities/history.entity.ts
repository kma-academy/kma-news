import { Expose } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @Column()
  visitDate: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  constructor(partial: Partial<History>) {
    Object.assign(this, partial);
  }
}
