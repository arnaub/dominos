import { Resolver, Query } from '@nestjs/graphql';
import { PlayersService } from './players.service';

@Resolver('Player')
export class PlayerResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query('players')
  async getPlayers(obj, args, context, info) {
    return await this.playersService.findAll();
  }
}
