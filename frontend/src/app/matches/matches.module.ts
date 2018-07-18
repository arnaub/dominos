import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Routes
import { MatchesRoutingModule } from "./matches-routing.module";

// Services
import { MatchesService } from "./services/matches.service";

// Components
import { ShowMatchComponent } from "./components/show-match/show-match.component";
import { MatchPlayersComponent } from "./components/match-players/match-players.component";
import { MatchScoreComponent } from "./components/match-score/match-score.component";
import { NewMatchComponent } from "./components/new-match/new-match.component";

// Dialogs
import { AddScoreDialog } from "./dialogs/add-score/add-score.dialog";
import { GameOverDialog } from "./dialogs/game-over/game-over.dialog";

// Materials
import {
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Modules
import { PlayersModule } from "../players/players.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatchesRoutingModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    PlayersModule,
    ReactiveFormsModule
  ],
  declarations: [
    NewMatchComponent,
    ShowMatchComponent,
    MatchPlayersComponent,
    MatchScoreComponent,
    AddScoreDialog,
    GameOverDialog,
    NewMatchComponent
  ],
  exports: [],
  entryComponents: [AddScoreDialog, GameOverDialog],
  providers: [MatchesService]
})
export class MatchesModule {}
