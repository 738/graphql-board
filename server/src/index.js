"use strict";
var GraphQLServer = require('graphql-yoga').GraphQLServer;
var BOARDS_SAMPLE = [
    {
        id: 0,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo'
    },
    {
        id: 1,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2'
    }
];
var resolvers = {
    Query: {
        BoardList: function () { return BOARDS_SAMPLE; }
    },
};
var server = new GraphQLServer({ typeDefs: 'src/graphql/schema.graphql', resolvers: resolvers });
server.start(function () { return console.log('Server is running'); });
