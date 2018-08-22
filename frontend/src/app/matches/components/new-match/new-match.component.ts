import { Component, OnInit } from "@angular/core";
import { Player } from "../../../players/models/players.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

// Store
import { Select, Store } from "@ngxs/store";
import { PlayersState } from "../../../players/state/players.state";
import { LoadPlayers } from "../../../players/state/players.action";
import { UpdateCurrentMatch } from "../../state/matches.actions";

// Services
import { MatchesService } from "../../services/matches.service";
@Component({
  selector: "app-new-match",
  templateUrl: "./new-match.component.html",
  styleUrls: ["./new-match.component.scss"]
})
export class NewMatchComponent implements OnInit {
  @Select(PlayersState.collection)
  players$: Observable<Player[]>;
  selectedPlayers: Player[];

  form$: Observable<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    console.log("newMatch");
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
    let match = this.matchesService.initMatch(
      form.value.players
        .filter(playerControl => playerControl.selected)
        .map(playerControl => playerControl.player)
    );
    this.store.dispatch(new UpdateCurrentMatch(match));
    this.router.navigate(["current-match"]);
  }
}
