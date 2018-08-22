import { Injectable } from '@nestjs/common';
import { Player } from './player.model';

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
  findAll(): Player[] {
    return PLAYERS;
  }
}
