import { Exclude, Expose } from 'class-transformer';
import { Post } from '../../post/entities/post.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  slug: string;

  @Column()
  title: string;

  @Column({ default: null, nullable: true })
  description: string;

  @DeleteDateColumn()
  @Exclude()
  deleteAt: Date;

  @Expose()
  get url(): string {
    return `/the-loai/${this.slug || ''}`;
  }

  @ManyToMany(() => Post)
  posts: Post[];

  constructor(paratial: Partial<Category>) {
    Object.assign(this, paratial);
  }
}
