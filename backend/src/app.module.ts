import { Module, MiddlewareConsumer } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { PlayersModule } from 'players/players.module';
import { MatchesModule } from 'matches/matches.module';

@Module({
  imports: [GraphQLModule, PlayersModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes('/graphql');
  }
}
