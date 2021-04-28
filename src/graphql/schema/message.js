import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        getAllMessages: [Message!]
        getSingleMessage: (messageId: Int!): Message
    }

    extend type Mutation {
        createMessage(text: String!): MessageResponse
        deleteMessage(messageId: Int!): Boolean!
    }

    type Message {
        messageId: Int!
        text: String!
        author: User!
    }

    type MessageResponse {
        messageId: Int!
        userId: Int!
        text: String!
    }
`;
