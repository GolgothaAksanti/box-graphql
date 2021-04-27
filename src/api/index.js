import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { createServer } from 'http';

import typDefs from '../graphql/schemas';
import resolvers from '../graphql/resolvers';
import context from '../graphql/context';

const app = express();

app.use(cors());

const apiVersion = '/api/v1';

const apolloServer = new ApolloServer({
  typDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable.enable': false,
    },
  },
});

apolloServer.applyMiddleware({
  app,
  path: apiVersion,
});

const server = createServer(app);

export default server;
