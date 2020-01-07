import Board from "../types/Board";

let boards: Board[] = [
    {
        id: 0,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 1,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    },
    {
        id: 2,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 3,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    },
    {
        id: 4,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 5,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    },
    {
        id: 6,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 7,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    },
    {
        id: 8,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 9,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    },
    {
        id: 10,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 11,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    },
    {
        id: 12,
        title: 'hello world',
        contents: 'this is graphql',
        author: 'junwoo',
    },
    {
        id: 13,
        title: 'hello world22',
        contents: 'this is graphql222',
        author: 'junwoo2',
    }
];

const getBoardById = (_, { id }) => {
    for (let i=0; i<boards.length; i++) {
        if (id == boards[i].id) {
            return boards[i];
        }
    }
    return null;
}

const createBoard = (_, { input }): Board => {
    const { title, contents, author } = input;
    const id = boards[boards.length - 1].id + 1;
    const newBoard = new Board(id, { title, contents, author });
    boards.push(newBoard);
    return newBoard;
}

const editBoard = (_, {id, input}): Board => {
    const { title, contents, author } = input;
    for (let i=0; i<boards.length; i++) {
        if (id === boards[i].id) {
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
        if (id === boards[i].id) {
            return boards.splice(i, 1).shift();
        }
    }
    return null;
}


export default {
    Query: {
        list: () => boards,
        detail: getBoardById,
    },
    Mutation: {
        createBoard,
        editBoard,
        deleteBoard,
    }
}
