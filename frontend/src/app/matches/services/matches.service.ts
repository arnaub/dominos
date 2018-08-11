import { Injectable } from "@angular/core";
import { Factory } from "rosie";
import MatchFactory from "../factories/match.factory";

import { Match, MatchPlayer } from "../models/match.model";
import { Player } from "../../players/models/players.model";
import { PLAYERS } from "../../players/models/mock-players";

@Injectable({
  providedIn: "root"
})
export class MatchesService {
  constructor() {}

  loadMatches(): Match[] {
    let matches = [];
    for (let i = 0; i < 10; i++) {
      let match: Match = MatchFactory.build();
      let maxScore = 0;
      let player = 0;
      while (maxScore < 101) {
        match.matchPlayers[player].score.push(Math.trunc(Math.random() * 25));
        maxScore = Math.max(
          this.totalScore(match.matchPlayers[player].score),
          maxScore
        );
        player = (player + 1) % PLAYERS.length;
      }
      matches = [...matches, match];
    }
    return matches;
  }

  initMatch(players: Player[]): Match {
    return {
      id: "1",
      matchPlayers: this.loadPlayers(players),
      created_at: new Date(),
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

  isWinner(match: Match, player: MatchPlayer) {
    return (
      this.winners(match).filter(winner => winner.id === player.id).length > 0
    );
  }

  isLoser(match: Match, player: MatchPlayer) {
    return (
      this.losers(match).filter(loser => loser.id === player.id).length > 0
    );
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
