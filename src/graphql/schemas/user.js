import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    password: String!
    messages: [Message!]
  }

  extend type Mutation {
    signup(input: SignupInput!): SignupResponse
    signin(input: SigninInput!): SigninResponse
  }

  type SignupResponse {
    userId: Int!
    username: String!
    email: String!
  }

  type SigninResponse {
    userId: int!
    username: String!
    email: String!
    token: String!
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input SigninInput {
    email: String!
    password: String!
  }
`;
