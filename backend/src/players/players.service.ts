import { Injectable } from '@nestjs/common';
import { Player } from './player.model';
import * as PlayerEntity from './player.entity';
import * as MatchPlayerEntity from 'matches/match-player.entity';

const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Jou',
    avatarUrl: 'assets/images/beer.svg',
    color: '#2fb87b',
  },
  {
    id: '2',
    name: 'Menda',
    avatarUrl: 'assets/images/menda.svg',
    color: '#bb2b31',
  },
  {
    id: '3',
    name: 'Arnau2',
    avatarUrl: 'assets/images/bald.svg',
    color: '#4bc6ba',
  },
  {
    id: '4',
    name: 'Kilian',
    avatarUrl: 'assets/images/monkey.svg',
    color: '#efa86e',
  },
  {
    id: '5',
    name: 'Pinacu',
    avatarUrl: 'assets/images/doctor.svg',
    color: '#05547b',
  },
  {
    id: '6',
    name: 'Vetus',
    avatarUrl: 'assets/images/head.svg',
    color: '#E76323',
  },
];

@Injectable()
export class PlayersService {
  findAll(): Promise<PlayerEntity.Player[]> {
    return PlayerEntity.Player.find({ relations: ['matchPlayers'] });
  }

  async create(playerDto: Player): Promise<PlayerEntity.Player> {
    const player = new PlayerEntity.Player();
    player.name = playerDto.name;
    player.avatarUrl = playerDto.avatarUrl;
    player.color = playerDto.color;
    return await player.save();
  }

  async wins(player: PlayerEntity.Player): Promise<number> {
    return player.matchPlayers.filter(match => match.position === 'winner')
      .length;
  }
}
