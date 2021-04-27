import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        users: [user!]
        user(id: ID!): User
        me: User
    }

    type User {
        id: ID!
        username: String!
        messages: [Message!]
    }
`;
