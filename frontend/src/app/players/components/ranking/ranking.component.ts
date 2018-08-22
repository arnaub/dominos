import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

// Models
import { Player } from "../../models/players.model";

// Store
import { Select, Store } from "@ngxs/store";
import { PlayersState } from "../../state/players.state";
import { LoadPlayers } from "../../state/players.action";

@Component({
  selector: "app-ranking",
  templateUrl: "./ranking.component.html",
  styleUrls: ["./ranking.component.scss"]
})
export class RankingComponent implements OnInit {
  @Select(PlayersState.collection)
  players$: Observable<Player[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());
  }
}
