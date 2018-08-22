import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;

  @Column('date') created_at: Date;

  @Column() completed: boolean;
}
