import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from 'src/app/models/BookModel';
import { BookState } from 'src/app/models/BookStateEnum';
import { BookListService } from 'src/app/services/book-list.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {

  constructor(
    private bookListService: BookListService
    ) { }

  ngOnInit(): void {
    this.bookListService.getBookListAndSetState();
  }
  public filterBookList(filterState: BookState) {
    this.bookListService.filterListByState(filterState);
  }
  public resetFilter() {
    this.bookListService.resetFilter();
  }
  get booksFromService$(): Observable<BookModel[] | null> {
    return this.bookListService.books$;
  }
  get selectedFilter$() {
    return this.bookListService.bookFilter$
  }
  public get BookState() {
    return BookState
  }

}
