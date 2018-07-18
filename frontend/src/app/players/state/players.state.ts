import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Player } from "../models/players.model";
import { PlayerService } from "../services/player.service";
import { LoadPlayers } from "./players.action";
import { tap } from "rxjs/operators";

interface PlayersStateModel {
  collection: Player[];
}

@State<PlayersStateModel>({
  name: "players",
  defaults: {
    collection: []
  }
})
export class PlayersState {
  constructor(private playerService: PlayerService) {}
  @Selector()
  static collection(state: PlayersStateModel) {
    return state.collection;
  }

  @Action(LoadPlayers)
  loadPlayers(context: StateContext<PlayersStateModel>) {
    return this.playerService.getPlayers().pipe(
      tap(collection => {
        context.patchState({
          collection
        });
      })
    );
  }
}
