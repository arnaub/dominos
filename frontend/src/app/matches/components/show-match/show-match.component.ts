import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";

// Store
import { Store } from "@ngxs/store";
import { UpdateCurrentMatch, AddMatch } from "../../../actions/matches.actions";

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
  match: Match;
  activePlayer: MatchPlayer;
  activeScore: number;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private store: Store,
    private matchesService: MatchesService
  ) {}

  ngOnInit() {
    let players: Player[] = PLAYERS;
    this.loadMatch(players);
    this.updateCurrentMatchState();
  }

  updateCurrentMatchState() {
    this.store.dispatch(new UpdateCurrentMatch(this.match));
  }

  loadMatch(players) {
    this.match = this.matchesService.initMatch(players);
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
        score: 0,
        avatar: player.player.avatarUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result > -1) {
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
      if (result > -1) {
        this.editPlayerScore(player, result, index);
      }
    });
  }

  totalScore(score) {
    return score.reduce((total, value) => total + parseInt(value), 0);
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
        case "rematch":
          this.store.dispatch(new AddMatch(this.match));
          const players = PLAYERS;
          this.loadMatch(players);
          break;
        case "config":
          this.router.navigateByUrl("");
          break;
      }
    });
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
