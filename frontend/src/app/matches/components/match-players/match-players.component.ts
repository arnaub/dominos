import { Component, OnInit, Input } from "@angular/core";
import { MatchPlayer } from "../../models/match.model";

@Component({
  selector: "app-match-players",
  templateUrl: "./match-players.component.html",
  styleUrls: ["./match-players.component.scss"]
})
export class MatchPlayersComponent implements OnInit {
  @Input() players: MatchPlayer[];
  constructor() {}

  ngOnInit() {}
}
