import { Injectable } from '@nestjs/common';
import { Match } from './match.model';

const MATCHES: Match[] = [];

@Injectable()
export class MatchesService {
  findAll(): Match[] {
    return MATCHES;
  }
}
