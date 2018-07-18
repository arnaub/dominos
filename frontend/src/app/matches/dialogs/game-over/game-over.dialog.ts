import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Player } from "../../../players/models/players.model";

export interface DialogData {
  winners: Player[];
  losers: Player[];
  beers: number;
}

@Component({
  selector: "game-over-dialog",
  templateUrl: "game-over.dialog.html",
  styleUrls: ["game-over.dialog.scss"]
})
export class GameOverDialog {
  constructor(
    public dialogRef: MatDialogRef<GameOverDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
