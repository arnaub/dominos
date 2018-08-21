import { Match } from "../models/match.model";

export class AddMatch {
  static readonly type = "[MATCHES] add";
  constructor(public payload: Match) {}
}

export class UpdateCurrentMatch {
  static readonly type = "[MATCHES] update current match";
  constructor(public payload: Match) {}
}

export class AddScoreToPlayer {
  static readonly type = "[MATCHES] add score to player in current match";
  constructor(public id: string, public score: number) {}
}
