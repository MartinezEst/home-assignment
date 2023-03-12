import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_API_WS_URL as string,
    webSocketImpl: WebSocket,
  }),
);

const httpLink: HttpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const link =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return def.kind === 'OperationDefinition' && def.operation === 'subscription';
        },
        wsLink,
        httpLink,
      )
    : httpLink;

// add error handling

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
