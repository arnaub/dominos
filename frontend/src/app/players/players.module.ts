import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Containers
import { PlayerBoxComponent } from "./containers/player-box/player-box.component";
import { NgxsModule } from "../../../node_modules/@ngxs/store";
import { PlayersState } from "./state/players.state";
import { PlayerService } from "./services/player.service";
import { RankingComponent } from "./components/ranking/ranking.component";

// Routes
import { PlayersRoutingModule } from "./players-routing.module";

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([PlayersState]),
    PlayersRoutingModule
  ],
  declarations: [PlayerBoxComponent, RankingComponent],
  exports: [PlayerBoxComponent],
  entryComponents: [],
  providers: [PlayerService]
})
export class PlayersModule {}
