import { gql } from 'apollo-server-express';

module.exports = gql`
  type User {
    userId: ID!
    username: String!
    email: String!
    password: String!
    role: String
    createdAt: Date!
    messages: [Message!]
  }

  extend type Mutation {
    register(input: RegisterInput!): Token!
    login(input: LoginInput!): Token!
    getAllUsers: [User!]
    getSingleUser(userId: ID!): User
    deleteUser(userId: ID!): Boolean!
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
    role: String
  }

  input LoginInput {
    login: String!
    password: String!
  }
`;
