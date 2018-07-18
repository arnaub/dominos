import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Containers
import { PlayerBoxComponent } from "./containers/player-box/player-box.component";
import { NgxsModule } from "../../../node_modules/@ngxs/store";
import { PlayersState } from "./state/players.state";
import { PlayerService } from "./services/player.service";

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([PlayersState])],
  declarations: [PlayerBoxComponent],
  exports: [PlayerBoxComponent],
  entryComponents: [],
  providers: [PlayerService]
})
export class PlayersModule {}
