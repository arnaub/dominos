import { Injectable } from "@angular/core";
import { Match, MatchPlayer } from "../models/match.model";
import { Player } from "../../players/models/players.model";

@Injectable({
  providedIn: "root"
})
export class MatchesService {
  constructor() {}

  initMatch(players: Player[]): Match {
    return {
      id: "1",
      matchPlayers: this.loadPlayers(players),
      completed: false
    };
  }

  loadPlayers(players: Player[]): MatchPlayer[] {
    return players.reduce((matchPlayers, player) => {
      return (matchPlayers = [
        ...matchPlayers,
        ...[
          {
            id: player.id,
            player: player,
            score: []
          }
        ]
      ]);
    }, []);
  }

  winners(match: Match) {
    const winnerScore = Math.min(...this.totalScoresArray(match));
    return match.matchPlayers
      .filter(x => this.totalScore(x.score) === winnerScore)
      .map(x => x.player);
  }

  losers(match: Match) {
    const winnerScore = Math.max(...this.totalScoresArray(match));
    return match.matchPlayers
      .filter(x => this.totalScore(x.score) === winnerScore)
      .map(x => x.player);
  }

  totalScoresArray(match: Match) {
    return match.matchPlayers.reduce<number[]>((scores, player) => {
      return (scores = [...scores, this.totalScore(player.score)]);
    }, []);
  }

  beers(match: Match) {
    let beers = 1;
    const totalScores = this.totalScoresArray(match);
    //
    if (Math.min(...totalScores) === 0) {
      beers = beers * 2;
    }
    beers = beers * Math.floor(Math.max(...totalScores) / 101);
    return beers;
  }

  totalScore(score) {
    return score.reduce((total, value) => total + parseInt(value), 0);
  }

  gameOver(match: Match, player: MatchPlayer) {
    if (this.totalScore(player.score) > 100) {
      match.completed = true;
    }
  }
}
