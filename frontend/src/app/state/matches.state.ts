import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Match } from "../matches/models/match.model";
import { UpdateCurrentMatch, AddMatch } from "./../actions/matches.actions";
import { MATCHES } from "../matches/models/mock-matches";

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
    matches: MATCHES
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
