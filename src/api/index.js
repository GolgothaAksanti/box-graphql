import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import fs from 'fs';

import port from '../helpers/portUtil';
import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import context from '../graphql/context';

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const accessLogStream = fs.createWriteStream('combine.log', { flags: 'a' });

app.use(cors());
app.use(
  morgan(isProd ? 'combined' : 'dev', {
    stream: isProd ? accessLogStream : null,
  }),
);

const apiVersion = '/api/v1';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
    },
  },
});

apolloServer.applyMiddleware({
  app,
  path: apiVersion,
});

const server = createServer(app);

export const onPort = port;
export default server;
