import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { MatchesService } from './matches.service';
import { Match } from './match.model';
import * as MatchEntity from './match.entity';

@Resolver('Match')
export class MatchResolver {
  constructor(private readonly matchesService: MatchesService) {}

  @Query('matches')
  async getMatches(obj, args, context, info) {
    return await this.matchesService.findAll();
  }

  // @Query('createMatch')
  // async createMatch(obj, args, context, info): Promise<MatchEntity.Match> {
  //   const { match } = args;
  //   return await this.matchesService.create(match);
  // }
}
