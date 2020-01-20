import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import DB from './db';

const server = new ApolloServer({ typeDefs, resolvers, context: async () => ({
        db: await DB(),
    })
});

server.listen().then(({ url }) => {
    console.log(`server is running at ${url}`);
});
