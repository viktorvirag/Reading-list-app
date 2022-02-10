import { Component, Input, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/BookModel';
import { BookState } from 'src/app/models/BookStateEnum';
import { EditBookService } from 'src/app/services/edit-book.service';

@Component({
  selector: 'app-reading-list-element',
  templateUrl: './reading-list-element.component.html',
  styleUrls: ['./reading-list-element.component.scss']
})
export class ReadingListElementComponent implements OnInit {

  @Input() bookFromParent: BookModel;
  constructor(
    private editBookService: EditBookService
  ) { }

  ngOnInit(): void {
  }
  public setBookState(state: BookState) {
    const bookToEdit = {...this.bookFromParent}
    bookToEdit.state = state;
    if(this.bookFromParent.state !== bookToEdit.state) {
      this.editBookService.editBook(bookToEdit);
    }
  }

  public get BookState() {
    return BookState
  }

}
