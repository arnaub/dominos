import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { MatchPlayer } from './match-player.entity';

@Entity()
export class Match extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;

  @Column('date') created_at: Date;

  @Column() completed: boolean;

  @OneToMany(type => MatchPlayer, matchPlayer => matchPlayer.match)
  matchPlayers: MatchPlayer[];
}
