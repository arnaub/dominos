import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MomentModule } from "angular2-moment";

// Apollo
import { ApolloModule, Apollo } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// Store
import { NgxsModule } from "@ngxs/store";
import { MatchesState } from "./matches/state/matches.state";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

// Modules
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatIconModule } from "@angular/material";
import { HttpClientModule } from "../../node_modules/@angular/common/http";
import { environment } from "../environments/environment";

import { MenuComponent } from "./menu/menu.component";

@NgModule({
  declarations: [AppComponent, NotFoundComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    NgxsModule.forRoot([MatchesState]),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: environment.apiUrl }),
      cache: new InMemoryCache()
    });
  }
}
