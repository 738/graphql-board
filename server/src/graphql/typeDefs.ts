import { gql } from "apollo-server";

const typeDefs = gql`
    type Board {
        id: ID!
        title: String!
        contents: String!
        author: String!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        author: String!
        contents: String!
    }

    input BoardInput {
        title: String!
        contents: String!
        author: String!
    }

    input CommentInput {
        boardId: ID!
        author: String!
        contents: String!
    }

    type Query {
        boards: [Board!]!
        board(id: ID!): Board
    }

    type Mutation {
        createBoard(input: BoardInput!): Board
        updateBoard(id: ID!, input: BoardInput!): Board
        deleteBoard(id: ID!): Board
        createComment(input: CommentInput!): Comment
    }
`;

export default typeDefs;
