import { Resolver, Query } from '@nestjs/graphql';
import { MatchesService } from './matches.service';

@Resolver('Match')
export class MatchResolver {
  constructor(private readonly matchesService: MatchesService) {}

  @Query('matches')
  async getMatches(obj, args, context, info) {
    return await this.matchesService.findAll();
  }
}
