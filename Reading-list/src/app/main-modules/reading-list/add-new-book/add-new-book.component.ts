import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public bookDescriptionControl = new FormControl(null, Validators.required);
  public createBookForm = new FormGroup({
    bookTitleControl: this.bookTitleControl,
    bookAuthorControl: this.bookAuthorControl,
    bookDescriptionControl: this.bookDescriptionControl
  });
  constructor(private bookListService: BookListService) { }

  ngOnInit(): void {
  }
  public addToBookList() {
    const greatestBookId = this.bookListService.returnIdOfPreviousBook()
    const bookToAdd = new BookModel(
      greatestBookId ? greatestBookId + 1 : 1,
      this.bookTitleControl.value,
      this.bookAuthorControl.value,
      this.bookDescriptionControl.value,
      BookState.READING
    )
    console.log("add", bookToAdd);
    this.bookListService.addToList(bookToAdd)
    this.resetForm();
  }
  public resetForm() {
    this.createBookForm.reset();
  }

}
