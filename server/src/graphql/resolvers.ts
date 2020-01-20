import Board, { Comment } from "../types/Board";
import uuidv4 from 'uuid/v4';
import assert from 'assert';

const getBoards = async (parents, args, context): Promise<Board[]> => {
    let boards = await context.db.collection('board').find().toArray();
    return boards.reverse();
}

const getBoardById = async (_, { id }, context): Promise<Board> => {
    const board = await context.db.collection('board').findOne({ id });
    return board;
}

const createBoard = async (_, { input }, context): Promise<Board> => {
    try {
        const id = uuidv4();
        const newBoard = new Board(id, input);
        let r = await context.db.collection('board').insertOne(newBoard);
        assert.equal(1, r.insertedCount);
        return newBoard;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const updateBoard = async (_, {id, input}, context): Promise<Board> => {
    try {
        const { title, contents, author } = input;
        let r = await context.db.collection('board').updateOne({ id }, { $set: {
            title, contents, author,
        }});
        assert.equal(1, r.modifiedCount);
        let data = await context.db.collection('board').findOne({ id });
        return data;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const deleteBoard = async (_, { id }, context): Promise<Board> => {
    try {
        const boardToDelete = await context.db.collection('board').findOne({ id })
        let r = await context.db.collection('board').deleteOne({id});
        assert.equal(1, r.deletedCount);
        return boardToDelete;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const createComment = async (_, { input }, context): Promise<Comment> => {
    try {
        const { boardId, title, author } = input;
        const newComment = new Comment(uuidv4(), input);

        const board = await context.db.collection('board').findOne({ id: boardId });
        const { comments } = board;

        let r = await context.db.collection('board').updateOne({ id: boardId }, { $set: {
            comments: [...comments, newComment],
        }});
        assert.equal(1, r.modifiedCount);

        return newComment;
    } catch (error) {
        console.log(error.stack);
        return null;
    }
}

const resolvers = {
    Query: {
        boards: getBoards,
        board: getBoardById,
    },
    Mutation: {
        createBoard,
        updateBoard,
        deleteBoard,
        createComment,
    },
    Board: {
        id: o => o.id,
        title: o => o.title,
        contents: o => o.contents,
        author: o => o.author,
        comments: o => o.comments.reverse(),
        commentsCount: o => o.comments.length,
    }
}

export default resolvers;
