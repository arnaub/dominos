import { Player } from "../../players/models/players.model";

export class Match {
  id: string;
  matchPlayers: MatchPlayer[];
  completed: boolean;
}

export class MatchPlayer {
  id: string;
  player: Player;
  score: number[];
}
