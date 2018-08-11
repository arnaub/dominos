import { Player } from "../../players/models/players.model";

export class Match {
  id: string;
  matchPlayers: MatchPlayer[];
  completed: boolean;
  created_at: Date;
}

export class MatchPlayer {
  id: string;
  player: Player;
  score: number[];
}
