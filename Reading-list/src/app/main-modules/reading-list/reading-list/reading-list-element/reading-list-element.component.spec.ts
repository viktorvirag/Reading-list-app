import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingListElementComponent } from './reading-list-element.component';

describe('ReadingListElementComponent', () => {
  let component: ReadingListElementComponent;
  let fixture: ComponentFixture<ReadingListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
