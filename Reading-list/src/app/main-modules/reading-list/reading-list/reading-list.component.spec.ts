import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListStubService } from 'src/app/mock-services/book-list.service.mock';
import { BookListService } from 'src/app/services/book-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReadingListComponent } from './reading-list.component';
import { BookModel } from 'src/app/models/BookModel';
import { BookState } from 'src/app/models/BookStateEnum';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers: [ 
        { proivde: BookListService, useClass: BookListStubService } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shuld display Reading List in h1', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.textContent).toBe('Reading list');
  });

  it('shuld always display a button to add new book', () => {
    const newButtonElement = fixture.debugElement.query(By.css('.new-book-btn'));
    expect(newButtonElement.nativeElement.textContent).toBe('New');
  });

  it('should navigate to /new when new button clicked', () => {
    spyOn(router, 'navigateByUrl');
    const newButtonElement = fixture.debugElement.query(By.css('.new-book-btn'));
    newButtonElement.nativeElement.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['new']),
    { skipLocationChange: false, replaceUrl: false, state: undefined });
  });

  it('shuld always display a button to reset the filter', () => {
    const resetButtonElement = fixture.debugElement.query(By.css('.reset-filter-btn'));
    expect(resetButtonElement.nativeElement.textContent).toBe('Reset Filter');
  });

  it('should call resetFilter method when reset button clicked', () => {
    const spy = spyOn(component, 'resetFilter');
    const resetButtonElement = fixture.debugElement.query(By.css('.reset-filter-btn'));
    resetButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call filterBookList method with BookState.BookState.READING when Reading button clicked', () => {
    const spy = spyOn(component, 'filterBookList');
    const readingButtonElement = fixture.debugElement.query(By.css('.reading-filter-btn'));
    readingButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(BookState.READING);
  });

  it('should call filterBookList method with BookState.BookState.READ when Read button clicked', () => {
    const spy = spyOn(component, 'filterBookList');
    const readButtonElement = fixture.debugElement.query(By.css('.read-filter-btn'));
    readButtonElement.triggerEventHandler('clickEmitter', {});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(BookState.READ);
  });

  it('shuld always display a button to set the filter to Reading', () => {
    const ReadingFilterButtonElement = fixture.debugElement.query(By.css('.reading-filter-btn'));
    expect(ReadingFilterButtonElement.nativeElement.textContent).toBe('Reading');
  });

  it('shuld always display a button to set the filter to Read', () => {
    const ReadFilterButtonElement = fixture.debugElement.query(By.css('.read-filter-btn'));
    expect(ReadFilterButtonElement.nativeElement.textContent).toBe('Read');
  });

  it('should show the right amount of books', () => {
    const mockList:  Array<BookModel> = [
      new BookModel(-1, 'Mock Title', 'Mock Author', '', BookState.READ),
      new BookModel(-2, 'Mock Title 2', 'Mock Author 2', '', BookState.READING),
    ]
    spyOnProperty(component, 'booksFromService$', 'get').and.returnValue(of(mockList));
    fixture.detectChanges();

    const bookListElements = fixture.debugElement.queryAll(By.css('app-reading-list-element'));
    expect(bookListElements.length).toEqual(mockList.length);
  });
});
