import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
export enum UserRole {
  ADMIN = 'admin',
  WRITTER = 'writter',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: null, nullable: true })
  avatarURL: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Exclude()
  @DeleteDateColumn()
  deleteAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
