import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class ReactPost {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Post)
  postId: number;
  @ManyToOne(() => User)
  userId: number;
}
