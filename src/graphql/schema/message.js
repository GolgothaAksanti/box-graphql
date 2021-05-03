import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    messageId: Int!
    text: String!
    userId: Int!
    createdAt: Date!
  }

  extend type Query {
    getAllMessages(cursor: String, limit: Int): MessageConnection!
    getSingleMessage(messageId: Int!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): CreateMessageResponse
    deleteMessage(messageId: Int!): Boolean!
  }

  type CreateMessageResponse {
    messageId: Int!
    userId: Int!
    text: String!
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }
   
  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }
`;
