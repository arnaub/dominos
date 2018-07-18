import { Component, OnInit } from "@angular/core";

import { Store } from "node_modules/@ngxs/store";
import { Match } from "../matches/models/match.model";

import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  matches$: Observable<Match[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.matches$ = this.store.select(state => state.matches.matches);
  }
}
