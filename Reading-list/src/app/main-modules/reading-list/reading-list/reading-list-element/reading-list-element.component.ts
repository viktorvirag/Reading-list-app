import { Component, Input, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/BookModel';
import { BookState } from 'src/app/models/BookStateEnum';

@Component({
  selector: 'app-reading-list-element',
  templateUrl: './reading-list-element.component.html',
  styleUrls: ['./reading-list-element.component.scss']
})
export class ReadingListElementComponent implements OnInit {

  @Input() bookFromParent: BookModel;
  constructor() { }

  ngOnInit(): void {
  }
  public setBookState() {
    console.log("change state")
  }
  public get BookState() {
    return BookState
  }

}
