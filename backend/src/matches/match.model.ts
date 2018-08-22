import { Player } from '../players/player.model';

export interface Match {
  id: string;
  matchPlayers: MatchPlayer[];
  completed: boolean;
  created_at: Date;
  winners?: string[];
  losers?: string[];
  beers?: number;
}

export class MatchPlayer {
  id: string;
  player: Player;
  score: number[];
}
