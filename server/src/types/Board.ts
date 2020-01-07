export interface BoardInput {
    title: string;
    contents: string;
    author: string;
}

export default class Board {
    id: number;
    title: string;
    contents: string;
    author: string;

    constructor(id: number, boardInput: BoardInput) {
        const { title, contents, author } = boardInput;
        this.id = id;
        this.title = title;
        this.contents = contents;
        this.author = author;
    }
}
