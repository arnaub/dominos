import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Routes
import { HomeRoutingModule } from "./home-routing.module";

//Components
import { HomeComponent } from "./components/home/home.component";

import { MatchesModule } from "../matches/matches.module";

@NgModule({
  imports: [CommonModule, HomeRoutingModule, MatchesModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
