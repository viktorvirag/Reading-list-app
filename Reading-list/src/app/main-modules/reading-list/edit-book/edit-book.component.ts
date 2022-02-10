import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BookModel } from 'src/app/models/BookModel';
import { ApiCommunicationService } from 'src/app/services/api-communication.service';
import { EditBookService } from 'src/app/services/edit-book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  public bookTitleControl = new FormControl(null, Validators.required);
  public bookAuthorControl = new FormControl(null, Validators.required);
  public bookDescriptionControl = new FormControl(null);
  public createBookForm = new FormGroup({
    bookTitleControl: this.bookTitleControl,
    bookAuthorControl: this.bookAuthorControl,
    bookDescriptionControl: this.bookDescriptionControl
  });
  constructor(
    private apiCommunicationService: ApiCommunicationService,
    private route: ActivatedRoute,
    private editBookService: EditBookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let paramString = params.get('id');
      if(paramString) {
        this.apiCommunicationService.getBookById(parseInt(paramString)).subscribe({
          next: this.onGetBookSuccess.bind(this),
          error: this.handleError.bind(this) 
        });
      }      
    });
  }
  handleError(error: HttpErrorResponse) {
    window.alert("ERROR: " + error.message);
    this.router.navigate(['']);
  }
  onGetBookSuccess(response: BookModel) {
    this.editBookService.updateBookToEdit(response);
    this.prefillForm(response);
  }
  private prefillForm(book: BookModel): void {
    this.createBookForm.get('bookTitleControl')!.setValue(book.title);
    this.createBookForm.get('bookAuthorControl')!.setValue(book.author);
    this.createBookForm.get('bookDescriptionControl')!.setValue(book.description);
  }
  editBookList(): void {
    if(this.createBookForm.valid) {
      const lastKnownBoard = this.editBookService.returnLastKnownValue();
      lastKnownBoard.title = this.createBookForm.get('bookTitleControl')!.value;
      lastKnownBoard.author = this.createBookForm.get('bookAuthorControl')!.value;
      lastKnownBoard.description = this.createBookForm.get('bookDescriptionControl')!.value;    
      this.editBookService.editBook(lastKnownBoard);
      this.router.navigate(['']);
    }
  }
}
