import { Component, OnInit } from "@angular/core";
import { Player } from "../../../players/models/players.model";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PlayersState } from "../../../players/state/players.state";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LoadPlayers } from "../../../players/state/players.action";

@Component({
  selector: "app-new-match",
  templateUrl: "./new-match.component.html",
  styleUrls: ["./new-match.component.scss"]
})
export class NewMatchComponent implements OnInit {
  @Select(PlayersState.collection) players$: Observable<Player[]>;
  selectedPlayers: Player[];

  form$: Observable<FormGroup>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new LoadPlayers());

    this.selectedPlayers = [];
    this.form$ = this.players$.pipe(
      map(players => {
        return this.fb.group({
          players: this.fb.array(
            players.map(player =>
              this.fb.group({
                player: [player],
                selected: [false]
              })
            )
          )
        });
      })
    );
  }

  createNewMatch(form: FormGroup) {
    console.log(
      form.value.players
        .filter(playerControl => playerControl.selected)
        .map(playerControl => playerControl.player)
    );
  }
}
