import { Expose } from 'class-transformer';
import {
  Column,
  DeleteDateColumn,
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
  post: number;
  @ManyToOne(() => User)
  user: number;
  @Column()
  visitDate: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
