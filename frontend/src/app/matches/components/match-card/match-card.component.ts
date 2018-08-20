import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Match, MatchPlayer } from "../../models/match.model";
import { MatchesService } from "../../services/matches.service";
import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-match-card",
  templateUrl: "./match-card.component.html",
  styleUrls: ["./match-card.component.scss"]
})
export class MatchCardComponent implements OnInit {
  @Input()
  match: Match;

  displayedColumns: string[] = ["avatar", "name", "score", "position"];
  dataSource: MatTableDataSource<MatchPlayer>;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.match.matchPlayers);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "name":
          return item.player.name;
        case "score":
          return this.totalScore(item.score);
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  totalScore(score: Number[]): Number {
    return this.matchesService.totalScore(score);
  }

  isWinner(player) {
    return this.matchesService.isWinner(this.match, player);
  }

  isLoser(player) {
    return this.matchesService.isLoser(this.match, player);
  }
}
