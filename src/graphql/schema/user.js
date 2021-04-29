import { gql } from 'apollo-server-express';

module.exports = gql`
  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
    messages: [Message!]
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
  }

  type RegisterResponse {
    userId: ID!
    username: String!
    email: String!
    token: String!
  }

  type LoginResponse {
    userId: ID!
    username: String!
    email: String!
    token: String!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
    username: String!
  }
`;
