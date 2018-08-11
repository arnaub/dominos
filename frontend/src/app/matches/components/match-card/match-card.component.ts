import { Component, OnInit, Input } from "@angular/core";
import { Match } from "../../models/match.model";
import { MatchesService } from "../../services/matches.service";

@Component({
  selector: "app-match-card",
  templateUrl: "./match-card.component.html",
  styleUrls: ["./match-card.component.scss"]
})
export class MatchCardComponent implements OnInit {
  @Input()
  match: Match;
  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    console.log(this.match);
  }

  totalScore(score): Number {
    return this.matchesService.totalScore(score);
  }

  isWinner(player) {
    return this.matchesService.isWinner(this.match, player);
  }

  isLoser(player) {
    return this.matchesService.isLoser(this.match, player);
  }
}
