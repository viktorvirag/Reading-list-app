import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookModel } from '../models/BookModel';
import { ApiCommunicationService } from './api-communication.service';
import { BookListService } from './book-list.service';

@Injectable({
  providedIn: 'root'
})
export class EditBookService {
  private readonly _bookToEdit = new BehaviorSubject<BookModel>({} as BookModel);
  bookToEdit$ = this._bookToEdit.asObservable();
  
  constructor(
    private apiCommunicationService: ApiCommunicationService,
    private bookListService: BookListService
  ) {}

  editBook(bookToEdit: BookModel): void {
    this.apiCommunicationService.patchBook(bookToEdit).subscribe({
      next: this.onPatchBookSuccess.bind(this),
      error: this.handleError.bind(this)
    });
  }
  onPatchBookSuccess(editedBook: BookModel): void {
    this.updateBookToEdit(editedBook);
    this.updateBookListInService(editedBook);
  }
  handleError(error: HttpErrorResponse): void {
    window.alert("ERROR: " + error.message);
  }
  updateBookToEdit(book: BookModel): void {
    this._bookToEdit.next(book);
  }
  updateBookListInService(editedBook: BookModel) {
    this.bookListService.updatEditedBookInList(editedBook);
  }
  returnLastKnownValue(): BookModel {
    return {...this._bookToEdit.getValue()}
  }
}
