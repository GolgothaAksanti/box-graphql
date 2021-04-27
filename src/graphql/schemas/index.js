import { gql } from 'apollo-server-express';

// import userSchema from './user';
// import messageSchema from './message';

const rootType = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }

  type Subscription {
    root: String
  }
`;

export default [rootType];
