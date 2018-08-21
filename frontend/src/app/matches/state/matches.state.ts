import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Match, MatchPlayer } from "../models/match.model";
import {
  UpdateCurrentMatch,
  AddMatch,
  AddScoreToPlayer
} from "./matches.actions";
import { MATCHES } from "../models/mock-matches";
import { state } from "@angular/animations";

export class MatchesStateModel {
  currentMatch: Match;
  matches: Match[];
}

@State<MatchesStateModel>({
  name: "matches",
  defaults: {
    currentMatch: {
      id: "0",
      matchPlayers: [],
      created_at: new Date(),
      completed: false
    },
    matches: []
  }
})
export class MatchesState {
  @Selector()
  static getCurrentMatch(state: MatchesStateModel) {
    return state.currentMatch;
  }

  @Selector()
  static getMatches(state: MatchesStateModel) {
    return state.matches;
  }

  @Action(AddMatch)
  add(
    { getState, patchState }: StateContext<MatchesStateModel>,
    { payload }: AddMatch
  ) {
    const state = getState();
    patchState({
      matches: [...state.matches, payload]
    });
  }

  @Action(UpdateCurrentMatch)
  update(
    { getState, patchState }: StateContext<MatchesStateModel>,
    { payload }: UpdateCurrentMatch
  ) {
    const state = getState();
    patchState({
      currentMatch: payload
    });
  }
}
