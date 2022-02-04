import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
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

  publisherHostname: string;

  @Column()
  owner: string;

  writterId: number;

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
