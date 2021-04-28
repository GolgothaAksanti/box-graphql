import { gql } from 'apollo-server-express';

import userType from './user';

const rootType = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

module.exports = [rootType, userType];
