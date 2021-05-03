import { gql } from 'apollo-server-express';

import userType from './user';
import messageType from './message';

const rootType = gql`
  scalar Date
  
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }

  type Subscription {
    _:String
  }
`;

module.exports = [rootType, userType, messageType];
