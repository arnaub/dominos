import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RankingComponent } from "./components/ranking/ranking.component";

const routes: Routes = [
  {
    path: "ranking",
    component: RankingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PlayersRoutingModule {}
