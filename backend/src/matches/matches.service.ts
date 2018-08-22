import { Injectable } from '@nestjs/common';
import * as MatchEntity from './match.entity';
import { Match } from './match.model';

const MATCHES: Match[] = [];

@Injectable()
export class MatchesService {
  findAll(): Match[] {
    return MATCHES;
  }

  async create(matchDto: Match): Promise<MatchEntity.Match> {
    const match = new MatchEntity.Match();
    match.completed = matchDto.completed;
    match.created_at = matchDto.created_at;
    return await match.save();
  }
}
