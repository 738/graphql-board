import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'graphql-board';
const client = new MongoClient(url);

const DB = async () => {
    await client.connect();
    return client.db(dbName);
}

export default DB;
