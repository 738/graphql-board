import { MongoClient, Collection, Db } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'graphql-board';
const collectionName = 'board';
const client = new MongoClient(url);

const DB = async (): Promise<Db> => {
    await client.connect();
    return client.db(dbName);
}

export const BoardCollection = async (): Promise<Collection> => {
    const db = await DB();
    return await db.collection(collectionName);
}

export default DB;
