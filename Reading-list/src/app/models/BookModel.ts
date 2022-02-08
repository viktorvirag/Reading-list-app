import { BookState } from "./BookStateEnum";

export class BookModel {
    
    id: number;
    title: string;
    author: string;
    description: string;
    state: BookState;

    constructor(id: number, title: string, author: string, description: string, state: BookState) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.state = state;
    }
}