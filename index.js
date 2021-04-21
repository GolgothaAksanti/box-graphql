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

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

const users = {
  1: {
    id: '1',
    username: 'Altare Aksanti',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Mapendo Celestin',
    messageId: [2],
  },
};

const me = users[1];

const messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By Wolrd',
    userId: '2',
  },
};

const resolvers = {
  Query: {
    users: () => Object.values(users),
    user: (parent, { id }) => users[id],
    me: (parent, args, { me }) => me,
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id],
  },

  User: {
    messages: (user) => Object.values(messages).filter((message) => message.userId === user.id),
  },

  Message: {
    user: (message) => users[message.userId],
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
