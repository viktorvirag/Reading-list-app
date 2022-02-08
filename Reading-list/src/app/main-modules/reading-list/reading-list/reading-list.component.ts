import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from 'src/app/models/BookModel';
import { BookListService } from 'src/app/services/book-list.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {

  constructor(private bookListService: BookListService) { }

  ngOnInit(): void {
  }
  get booksFromService$(): Observable<BookModel[]> {
    return this.bookListService.books$;
  }

}
