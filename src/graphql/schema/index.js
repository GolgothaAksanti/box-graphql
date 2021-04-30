import { gql } from 'apollo-server-express';

import userType from './user';
import messageType from './message';

const rootType = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

module.exports = [rootType, userType, messageType];
