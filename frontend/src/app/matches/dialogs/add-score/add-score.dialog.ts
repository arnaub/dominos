import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  name: string;
  avatar: string;
  score: number;
}

@Component({
  selector: "add-score-dialog",
  templateUrl: "add-score.dialog.html",
  styleUrls: ["add-score.dialog.scss"]
})
export class AddScoreDialog {
  constructor(
    public dialogRef: MatDialogRef<AddScoreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
