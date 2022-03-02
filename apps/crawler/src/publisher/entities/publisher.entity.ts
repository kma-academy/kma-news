import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class Publisher {
  @PrimaryColumn()
  hostname: string;

  @Column({ default: 'bao moi' })
  name: string;

  @Column({
    default:
      'https://baomoi-static.zadn.vn/web/styles/img/logo-baomoi-gray.png',
  })
  logo: string;

  @Column()
  home: string;
}
