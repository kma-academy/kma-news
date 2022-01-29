import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum OptionType {
  PLAIN_TEXT = 'plain_text',
  JSON_TEXT = 'json_text',
}

@Entity()
export class Option {
  @PrimaryColumn()
  name: string;

  @Column('mediumtext')
  value: string;

  @Column({ type: 'enum', enum: OptionType, default: OptionType.PLAIN_TEXT })
  type: OptionType;
}
