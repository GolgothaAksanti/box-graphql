import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    messageId: Int!
    text: String!
    userId: Int!
  }

  extend type Query {
      getAllMessages: [Message!]
      # getSingleMessage: (messageId: Int!): Message
  }

  extend type Mutation {
    createMessage(text: String!): CreateMessageResponse
    # deleteMessage(messageId: Int!): Boolean!
  }

  type CreateMessageResponse {
    messageId: Int!
    userId: Int!
    text: String!
  }
`;
