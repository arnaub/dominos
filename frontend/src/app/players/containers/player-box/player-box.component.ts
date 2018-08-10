import { Component, OnInit, Input } from "@angular/core";
import { Player } from "../../models/players.model";

@Component({
  selector: "app-player-box",
  templateUrl: "./player-box.component.html",
  styleUrls: ["./player-box.component.scss"]
})
export class PlayerBoxComponent implements OnInit {
  @Input() player: Player;
  constructor() {}

  ngOnInit() {}
}
