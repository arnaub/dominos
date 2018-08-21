import { Component, OnInit } from "@angular/core";

import { Store, Select } from "node_modules/@ngxs/store";
import { Match } from "../../../matches/models/match.model";

import { Observable } from "rxjs";
import { MatchesService } from "../../../matches/services/matches.service";
import { MatchesState } from "../../../matches/state/matches.state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @Select(MatchesState.getMatches)
  matches$: Observable<Match[]>;

  constructor(private store: Store, private matchesService: MatchesService) {}

  ngOnInit() {}

  sort(matches: Match[]): Match[] {
    return matches.sort((a, b) => {
      if (a > b) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
