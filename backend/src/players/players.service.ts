import { Injectable } from '@nestjs/common';
import { Player } from './player.model';

const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Jou',
    avatarUrl: 'http://thecatapi.com/api/images/get?format=src&type=png',
  },
  {
    id: '2',
    name: 'Menda',
    avatarUrl: 'http://thecatapi.com/api/images/get?format=src&type=png',
  },
  {
    id: '3',
    name: 'Arnau',
    avatarUrl: 'http://thecatapi.com/api/images/get?format=src&type=png',
  },
  {
    id: '4',
    name: 'Kilian',
    avatarUrl: 'http://thecatapi.com/api/images/get?format=src&type=png',
  },
];

@Injectable()
export class PlayersService {
  findAll(): Player[] {
    return PLAYERS;
  }
}
