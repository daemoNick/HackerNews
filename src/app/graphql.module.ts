import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';


const uri = 'https://www.graphqlhub.com/graphql?pretty=true'; // <-- add the URL of the GraphQL server here
// const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql'; //our test Graphql Server which returns rates

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
