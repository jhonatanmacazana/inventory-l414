import { gql } from "apollo-server";

const schema = gql`
  scalar Date
  type User {
    _id: ID!
    username: String!
  }
  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    _id: ID!
    user: User!
  }
  type Query {
    userSession(me: Boolean!): UserSession
  }
`;

export default schema;
