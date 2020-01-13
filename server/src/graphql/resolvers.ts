import Board, { Comment } from "../types/Board";

const getBoardById = (_, { id }) => {
    for (let i=0; i<boards.length; i++) {
        if (id == boards[i].id) {
            return boards[i];
        }
    }
    return null;
}

const createBoard = (_, { input }): Board => {
    const id: string = (boards.length ? (+boards[boards.length - 1].id + 1) : 0) + '';
    const newBoard = new Board(id, input);
    boards.push(newBoard);
    return newBoard;
}

const updateBoard = (_, {id, input}): Board => {
    const { title, contents, author } = input;
    for (let i=0; i<boards.length; i++) {
        if (id == boards[i].id) {
            boards[i].title = title;
            boards[i].contents = contents;
            boards[i].author = author;
            return boards[i];
        }
    }
    return null;
}

const deleteBoard = (_, { id }): Board => {
    for (let i=0; i<boards.length; i++) {
        if (id == boards[i].id) {
            return boards.splice(i, 1).shift();
        }
    }
    return null;
}

const createComment = (_, { input }): Comment => {
    for (let i=0; i<boards.length; i++) {
        if (input.boardId == boards[i].id) {
            const id: string = (boards[i].comments.length ? (+boards[i].comments[boards[i].comments.length - 1].id + 1) : 0)+ '';
            const newComment = new Comment(id, input);
            boards[i].comments.push(newComment);
            return newComment;
        }
    }
    return null;
}

export default {
    Query: {
        boards: () => boards,
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
