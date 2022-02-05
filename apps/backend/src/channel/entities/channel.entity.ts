import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User)
  owner: User;

  @Column({ default: false })
  isPublic: boolean;

  @Column('simple-array')
  keywords: string[];

  @Column('simple-array')
  categories: number[];

  @Column('simple-array')
  publishers: string[];

  @Column('simple-array')
  excludedKeywords: string[];

  @Column('simple-array')
  excludedCategories: number[];

  @Column('simple-array')
  excludedPublishers: string[];

  @DeleteDateColumn()
  deleteAt: Date;

  @Expose()
  get url(): string {
    return '/chu-de/' + this.id;
  }

  constructor(paratial: Partial<Channel>) {
    Object.assign(this, paratial);
  }
}
