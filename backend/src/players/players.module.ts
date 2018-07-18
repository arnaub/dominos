import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerResolver } from './player.resolver';

@Module({
  providers: [PlayersService, PlayerResolver],
})
export class PlayersModule {}
