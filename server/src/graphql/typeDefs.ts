import { gql } from "apollo-server";

const typeDefs = gql`
    input BoardInput {
        title: String!
        contents: String!
        author: String!
    }

    type Board {
        id: ID!
        title: String!
        contents: String!
        author: String!
    }

    type Query {
        list: [Board]!
        detail(id: ID!): Board
    }

    type Mutation {
        createBoard(input: BoardInput!): Board
        editBoard(id: ID!, input: BoardInput!): Board
        deleteBoard(id: ID!): Board
    }
`;

export default typeDefs;
