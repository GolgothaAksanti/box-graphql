import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

const users = {
  1: {
    id: '1',
    username: 'Altare Aksanti',
  },
  2: {
    id: '2',
    username: 'Mapendo Celestin',
  },
};

const me = users[1];

const resolvers = {
  Query: {
    users: () => Object.values(users),
    user: (parent, { id }) => users[id],
    me: (parent, args, { me }) => me,
  },

  User: {
    username: (user) => `${user.firstname} ${user.lastname}`,
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen({ port: 8000 }, () => {
  process.stdout.write(
    'Apollo server listening on: http://localhost:8000/graphql',
  );
});
