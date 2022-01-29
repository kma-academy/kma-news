import { Expose } from 'class-transformer';
import { Category } from '../../category/entities/category.entity';
import { Publisher } from '../../publisher/entities/publisher.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Paragraph } from './paragraph.entity';

export enum PostStatus {
  PUBLISHED = 'published',
  PENDING = 'pending',
  DRAFT = 'draft',
  TRASH = 'trash',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sourceURL: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  thumbnailURL: string;

  @ManyToOne(() => Publisher)
  publisher: Publisher;

  @Column()
  owner: string;

  @ManyToOne(() => User)
  writter: User;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.PENDING })
  status: PostStatus;

  @Column({ nullable: true })
  publishedAt?: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column('simple-array')
  @Index({
    fulltext: true,
  })
  keywords: string[];

  @Column({ default: 0 })
  viewCount: number;

  @OneToMany(() => Paragraph, (paragraph) => paragraph.post)
  paragraphs: Paragraph[];

  @Expose()
  get url(): string {
    return `/bai-bao/${this.slug || 'abc'}/${this.id}`;
  }

  constructor(partial: Partial<Post>) {
    Object.assign(this, partial);
  }
}
