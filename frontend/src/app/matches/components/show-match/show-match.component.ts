import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// Store
import { Store, Select } from "@ngxs/store";
import { UpdateCurrentMatch, AddMatch } from "../../state/matches.actions";
import { MatchesState } from "../../state/matches.state";

// Services
import { MatchesService } from "../../services/matches.service";

// Models and fake data
import { Match, MatchPlayer } from "../../models/match.model";
import { PLAYERS } from "../../../players/models/mock-players";
import { Player } from "../../../players/models/players.model";

// Dialogs
import { AddScoreDialog } from "../../dialogs/add-score/add-score.dialog";
import { GameOverDialog } from "../../dialogs/game-over/game-over.dialog";

@Component({
  selector: "app-show-match",
  templateUrl: "./show-match.component.html",
  styleUrls: ["./show-match.component.scss"]
})
export class ShowMatchComponent implements OnInit {
  activePlayer: MatchPlayer;
  activeScore: number;

  @Select(MatchesState.getCurrentMatch)
  match$: Observable<Match>;

  match: Match;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    this.match$.subscribe(match => (this.match = match));
  }

  updateCurrentMatchState() {
    this.store.dispatch(new UpdateCurrentMatch(this.match));
  }

  addPlayerScore(player: MatchPlayer, score: number) {
    this.match.matchPlayers
      .filter(x => x.id === player.id)
      .map(x => (x.score = [...x.score, score]));

    this.gameOver(player);
    this.updateCurrentMatchState();
  }

  editPlayerScore(player: MatchPlayer, score: number, index: number) {
    this.match.matchPlayers
      .filter(x => x.id === player.id)
      .map(x => (x.score[index] = score));
    this.match.completed = false;
    this.match.matchPlayers.map(x => this.gameOver(x));
    this.updateCurrentMatchState();
  }

  addScore(player: MatchPlayer): void {
    const dialogRef = this.dialog.open(AddScoreDialog, {
      data: {
        name: player.player.name,
        score: null,
        avatar: player.player.avatarUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result > -1) {
        this.addPlayerScore(player, result);
      }
    });
  }

  editScore(player: MatchPlayer, score: number, index: number): void {
    const dialogRef = this.dialog.open(AddScoreDialog, {
      data: {
        name: player.player.name,
        score: score,
        avatar: player.player.avatarUrl
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result > -1) {
        this.editPlayerScore(player, result, index);
      }
    });
  }

  totalScore(score) {
    return this.matchesService.totalScore(score);
  }

  gameOver(player: MatchPlayer) {
    if (this.totalScore(player.score) > 100) {
      this.match.completed = true;
    }
  }

  gameOverDialog() {
    const dialogRef = this.dialog.open(GameOverDialog, {
      data: {
        winners: this.winners(),
        losers: this.losers(),
        beers: this.beers()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case "endGame":
          this.submitMatch();
          this.router.navigateByUrl("matches/new-match");
          break;
      }
    });
  }

  submitMatch() {
    this.match.beers = this.beers();
    this.store.dispatch(new AddMatch(this.match));
  }

  winners() {
    return this.matchesService.winners(this.match);
  }

  losers() {
    return this.matchesService.losers(this.match);
  }

  totalScoresArray() {
    return this.matchesService.totalScoresArray(this.match);
  }

  beers() {
    return this.matchesService.beers(this.match);
  }
}
