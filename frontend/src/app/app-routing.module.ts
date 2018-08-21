import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/components/home/home.component";
import { environment } from "../environments/environment";
import { NotFoundComponent } from "./not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: "./home/home.module#HomeModule"
  },
  {
    path: "matches",
    loadChildren: "./matches/matches.module#MatchesModule"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.router.enableTracing
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
