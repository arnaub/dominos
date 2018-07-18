import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchResolver } from './match.resolver';

@Module({
  providers: [MatchesService, MatchResolver],
})
export class MatchesModule {}
