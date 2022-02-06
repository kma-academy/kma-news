import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

export enum ParagraphType {
  TEXT = 'text',
  IMAGE = 'image',
}
@Entity()
export class Paragraph {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @ManyToOne(() => Post, (post) => post.paragraphs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Exclude()
  post: Post;

  @Column({ type: 'enum', enum: ParagraphType, default: ParagraphType.TEXT })
  type: ParagraphType;

  @Column('mediumtext')
  content: string;

  @Column('simple-array')
  imageURL: string[];

  constructor(partial: Partial<Paragraph>) {
    Object.assign(this, partial);
  }
}
