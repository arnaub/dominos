import { DocumentNode } from "graphql";
const GetPlayers: DocumentNode = require("graphql-tag/loader!../graphql/get_players.graphql");

import { Injectable } from "@angular/core";
import { Player } from "../../players/models/players.model";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PlayerService {
  constructor(private apollo: Apollo) {}

  getPlayers(): Observable<Player[]> {
    return this.apollo
      .query<any>({
        query: GetPlayers
      })
      .pipe(map(({ data }) => data.players));
  }
}
