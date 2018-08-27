import { Injectable } from '@nestjs/common';
import * as MatchEntity from './match.entity';
import * as MatchPlayerEntity from './match-player.entity';
import * as PlayerEntity from '../players/player.entity';
import { Match } from './match.model';

const MATCHES: Match[] = [];

@Injectable()
export class MatchesService {
  async findAll(): Promise<MatchEntity.Match[]> {
    return await MatchEntity.Match.find({ relations: ['matchPlayers'] });
  }

  async create(matchDto: Match): Promise<MatchEntity.Match> {
    const match = new MatchEntity.Match();
    match.completed = matchDto.completed;
    match.created_at = matchDto.created_at;
    await match.save();
    await this.createMatchPlayers(matchDto, match);
    return match;
  }

  private async createMatchPlayers(matchDto: Match, match: MatchEntity.Match) {
    matchDto.matchPlayers.map(async playerDto => {
      const player = await PlayerEntity.Player.findOne(playerDto.playerId);
      const matchPlayer = new MatchPlayerEntity.MatchPlayer();
      matchPlayer.match = match;
      matchPlayer.player = player;
      matchPlayer.position = this.setPosition(matchDto, player.id);
      matchPlayer.score = playerDto.score;
      matchPlayer.beers = matchDto.beers;
      matchPlayer.save();
    });
  }

  private setPosition(match: Match, id: string): string {
    const isWinner = match.winners.filter(x => x === id);
    const isLoser = match.losers.filter(x => x === id);
    if (isWinner.length > 0) {
      return 'winner';
    }
    if (isLoser.length > 0) {
      return 'loser';
    }
    return 'second';
  }
}
