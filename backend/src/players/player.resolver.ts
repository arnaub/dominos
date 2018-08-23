import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { PlayersService } from './players.service';

@Resolver('Player')
export class PlayerResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query('players')
  async getPlayers(obj, args, context, info) {
    const players = await this.playersService.findAll();
    return players.reduce((list, player) => {
      return [
        ...list,
        {
          ...player,
          wins: this.playersService.wins(player),
          loses: player.matchPlayers.length,
        },
      ];
    }, []);
  }

  @Mutation()
  async createPlayer(obj, args, context, info) {
    const { player } = args;
    return await this.playersService.create(player);
  }
}
