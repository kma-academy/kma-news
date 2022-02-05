import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryColumn()
  hostname: string;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  home: string;
}
