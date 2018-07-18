import { Match } from "../matches/models/match.model";

export class AddMatch {
  static readonly type = "[MATCHES] add";
  constructor(public payload: Match) {}
}

export class UpdateCurrentMatch {
  static readonly type = "[MATCHES] update current match";
  constructor(public payload: Match) {}
}
