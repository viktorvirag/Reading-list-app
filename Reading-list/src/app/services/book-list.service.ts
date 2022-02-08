import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookModel } from '../models/BookModel';
import { BookState } from '../models/BookStateEnum';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  private readonly _books = new BehaviorSubject<BookModel[]>([]);
  books$ = this._books.asObservable();

  constructor() {
    this._books.next([
      new BookModel(2, "könyvcím2", "Ralph lauren2", "description2", BookState.READING),
      new BookModel(1, "könyvcím", "Ralph lauren", "description", BookState.READ)
    ])
  }
  returnIdOfPreviousBook(): number {
    return this._books.getValue()[0]?.id;
  }
  addToList(bookToAdd: BookModel): void {
    const newList = [bookToAdd, ...this._books.getValue()];
    console.log("newList:",newList, "original:", this._books.getValue());
    this.updateBookList(newList);
  }
  updateBookList(newList: BookModel[]): void {
    this._books.next(newList);
  }
}
