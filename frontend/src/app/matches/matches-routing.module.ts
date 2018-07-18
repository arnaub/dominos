import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowMatchComponent } from "./components/show-match/show-match.component";
import { NewMatchComponent } from "./components/new-match/new-match.component";

const routes: Routes = [
  {
    path: "",
    component: ShowMatchComponent
  },
  {
    path: "new-match",
    component: NewMatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MatchesRoutingModule {}
