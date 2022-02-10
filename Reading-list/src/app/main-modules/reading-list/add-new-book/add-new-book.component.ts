import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/BookModel';
import { BookState } from 'src/app/models/BookStateEnum';
import { BookListService } from 'src/app/services/book-list.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss']
})
export class AddNewBookComponent implements OnInit {
  public bookTitleControl = new FormControl(null, Validators.required);
  public bookAuthorControl = new FormControl(null, Validators.required);
  public bookDescriptionControl = new FormControl(null);
  public createBookForm = new FormGroup({
    bookTitleControl: this.bookTitleControl,
    bookAuthorControl: this.bookAuthorControl,
    bookDescriptionControl: this.bookDescriptionControl
  });
  constructor(
    private bookListService: BookListService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.bookListService.getBookListAndSetState();
  }
  public addToBookList() {
  if(this.createBookForm.valid) {
    const greatestBookId = this.bookListService.returnIdOfPreviousBook();
    const bookToAdd = new BookModel(
      greatestBookId ? greatestBookId + 1 : 1,
      this.bookTitleControl.value,
      this.bookAuthorControl.value,
      this.bookDescriptionControl.value,
      BookState.READING
    )
    this.bookListService.addNewBook(bookToAdd)
    this.resetForm();
    this.router.navigate(['']);
  }
  }
  public resetForm() {
    this.createBookForm.reset();
  }

}
