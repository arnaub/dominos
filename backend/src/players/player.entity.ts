import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { MatchPlayer } from '../matches/match-player.entity';

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn() id: string;

  @Column() name: string;

  @Column() avatarUrl: string;

  @Column() color: string;

  @OneToMany(type => MatchPlayer, matchPlayer => matchPlayer.player)
  matchPlayers: MatchPlayer[];
}
