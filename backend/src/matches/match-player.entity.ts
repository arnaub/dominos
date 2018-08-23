import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

import { Match } from './match.entity';
import { Player } from '../players/player.entity';

@Entity()
export class MatchPlayer extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;

  @Column() position: string;

  @Column('int') score: number;

  @Column('int') beers: number;

  @ManyToOne(type => Match, match => match.matchPlayers)
  match: Match;

  @ManyToOne(type => Player, player => player.matchPlayers)
  player: Player;
}
