import Board, { Comment } from "../types/Board";
import uuidv4 from 'uuid/v4';
import assert from 'assert';
import DB from '../db';

const getBoards = async (): Promise<Board[] | any> => {
    try {
        const db = await DB();
        const boards = await (await db.collection('board').find().toArray()).reverse();
        boards.forEach(board => {
            board.comments = board.comments.reverse();
        });
        return boards;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const getBoardById = async (_, { id }) => {
    try {
        const db = await DB();
        const board = await db.collection('board').findOne({ id });
        board.comments = board.comments.reverse();
        return board;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const createBoard = async (_, { input }): Promise<Board> => {
    try {
        const db = await DB();
        const id = uuidv4();
        const newBoard = new Board(id, input);
        let r = await db.collection('board').insertOne(newBoard);
        assert.equal(1, r.insertedCount);
        return newBoard;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const updateBoard = async (_, {id, input}): Promise<Board> => {
    try {
        const db = await DB();
        const { title, contents, author } = input;
        let r = await db.collection('board').updateOne({ id }, { $set: {
            title, contents, author,
        }});
        assert.equal(1, r.modifiedCount);
        let data = await db.collection('board').findOne({ id });
        return data;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const deleteBoard = async (_, { id }): Promise<Board> => {
    try {
        const db = await DB();
        const boardToDelete = await db.collection('board').findOne({ id })
        let r = await db.collection('board').deleteOne({id});
        assert.equal(1, r.deletedCount);
        return boardToDelete;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const createComment = async (_, { input }): Promise<Comment> => {
    try {
        const db = await DB();
        const { boardId, title, author } = input;
        const newComment = new Comment(uuidv4(), input);

        const board = await db.collection('board').findOne({ id: boardId });
        const { comments } = board;

        let r = await db.collection('board').updateOne({ id: boardId }, { $set: {
            comments: [...comments, newComment],
        }});
        assert.equal(1, r.modifiedCount);

        return newComment;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

export default {
    Query: {
        boards: getBoards,
        board: getBoardById,
    },
    Mutation: {
        createBoard,
        updateBoard,
        deleteBoard,
        createComment,
    }
}

let boards: Board[] = [
    {
        id: '0',
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
        comments: [],
    },
    {
        id: '1',
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
        comments: [],
    },
    {
        id: '2',
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
        comments: [],
    },
    {
        id: '3',
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
        comments: [],
    },
    {
        id: '4',
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
        comments: [],
    },
    {
        id: '5',
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
        comments: [],
    },
    {
        id: '6',
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
        comments: [],
    },
    {
        id: '7',
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
        comments: [{
            id: '0',
            author: 'lucky',
            contents: 'hello world'
        }, {
            id: '1',
            author: 'lucky2',
            contents: 'hello world2'
        }],
    },
];
