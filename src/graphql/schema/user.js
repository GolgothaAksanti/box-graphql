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
    register(input: RegisterInput!): Token!
    login(input: LoginInput!): Token!
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

  type Token {
    token: String!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }

  input LoginInput {
    login: String!
    password: String!
  }
`;
