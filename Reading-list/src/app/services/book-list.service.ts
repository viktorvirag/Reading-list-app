import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { BoardFilter } from '../models/BookFilter';
import { BookModel } from '../models/BookModel';
import { BookState } from '../models/BookStateEnum';
import { ApiCommunicationService } from './api-communication.service';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  private readonly _books = new BehaviorSubject<BookModel[] | null>(null);
  books$ = this._books.asObservable();

  private readonly _bookFilter = new BehaviorSubject<BoardFilter>({} as BoardFilter);
  bookFilter$ = this._bookFilter.asObservable();

  private getBookListFromServer = this.apiCommunicationService.getBooks();

  constructor(
    private apiCommunicationService: ApiCommunicationService
    ) {}
  
  returnIdOfPreviousBook(): number {
    return this._books.getValue()![this._books.getValue()!.length -1]?.id;
  }
  addNewBook(bookToAdd: BookModel): void {
    const newList = [...this._books.getValue()!, bookToAdd];
    this.apiCommunicationService.postBook(bookToAdd).subscribe({
      next: () => this.updateBookList(newList),
      error: () => window.alert("Error")
    });
  }
  updatEditedBookInList(editedBook: BookModel): void {
    const newList = [...this._books.getValue()!];
    const indexOfEditedBook = newList.findIndex(book => book.id === editedBook.id);
    if (indexOfEditedBook !== -1) {
      newList[indexOfEditedBook] = editedBook;
      this.updateBookList(newList);
    }
  }
  filterListByState(filterState: BookState): void {
    this.setFilterState(new BoardFilter(filterState));
    const filteredRequest = this.getBookListFromServer
    .pipe(
      map( book => book.filter(book => book.state === filterState) )
    );
    filteredRequest.subscribe({
      next: this.updateBookList.bind(this),
      error: this.handleError.bind(this)
    });
  }
  resetFilter(): void {
    if(Object.keys(this._bookFilter.getValue()).length !== 0) {
      this.setFilterState({} as BoardFilter);
      this.getBookListAndSetState();
    }
  }
  getBookListAndSetState(): void {
    this.getBookListFromServer.subscribe({
      next: this.updateBookList.bind(this),
      error: this.handleError.bind(this)
    });
  }
  handleError(error: HttpErrorResponse): void {
    window.alert("ERROR: " + error.message);
  }
  setFilterState(stateToSet: BoardFilter): void {
    this._bookFilter.next(stateToSet);
  }
  updateBookList(newList: BookModel[]): void {
    this._books.next(newList);
  }
}


