import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookModel } from '../models/BookModel';

@Injectable({
  providedIn: 'root'
})
export class ApiCommunicationService {
  private BASEURL = "http://localhost:3000";
  private ENDPOINT = "/books"
  constructor (
    private http: HttpClient
    ) {}

  public getBooks(): Observable<BookModel[]> { 
    return this.http.get<BookModel[]>(` ${this.BASEURL + this.ENDPOINT} `);
  }
  public getBookById(id: number): Observable<BookModel> {
    return this.http.get<BookModel>(` ${this.BASEURL + this.ENDPOINT}/${id} `);
  }
  public postBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(` ${this.BASEURL + this.ENDPOINT} `, book);
  }
  public patchBook(book: BookModel): Observable<BookModel> {
    return this.http.patch<BookModel>(` ${this.BASEURL + this.ENDPOINT}/${book.id} `, book);
  }
}
