import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookListStubService } from 'src/app/mock-services/book-list.service.mock';
import { BookListService } from 'src/app/services/book-list.service';

import { AddNewBookComponent } from './add-new-book.component';

describe('AddNewBookComponent', () => {
  let component: AddNewBookComponent;
  let fixture: ComponentFixture<AddNewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBookComponent ],
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
    fixture = TestBed.createComponent(AddNewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
