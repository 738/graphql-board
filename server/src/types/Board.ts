export interface BoardInput {
    title: string;
    contents: string;
    author: string;
}

export interface CommentInput {
    boardId: string;
    author: string;
    contents: string;
}

export class Comment {
    id: string;
    author: string;
    contents: string;

    constructor(id: string, commentInput: CommentInput) {
        const { contents, author } = commentInput;
        this.id = id;
        this.contents = contents;
        this.author = author;
    }
}

export default class Board {
    id: string;
    title: string;
    contents: string;
    author: string;
    comments: Comment[];

    constructor(id: string, boardInput: BoardInput) {
        const { title, contents, author } = boardInput;
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.author = author;
        this.comments = [];
    }
}
