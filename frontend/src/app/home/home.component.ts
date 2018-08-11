import { Component, OnInit } from "@angular/core";

import { Store } from "node_modules/@ngxs/store";
import { Match } from "../matches/models/match.model";

import { Observable } from "rxjs";
import { MatchesService } from "../matches/services/matches.service";

import { MatchCardComponent } from "../matches/components/match-card/match-card.component";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  matches$: Observable<Match[]>;
  matches: Match[];

  constructor(private store: Store, private matchesService: MatchesService) {}

  ngOnInit() {
    // this.matches$ = this.store.select(state => state.matches.matches);
    this.matches = this.matchesService.loadMatches();
  }
}
