import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { ReadingListRoutingModule } from './reading-list-routing.module';
import { ReadingListElementComponent } from './reading-list/reading-list-element/reading-list-element.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { UiInputModule } from 'src/app/ui-components/ui-input/ui-input.module';
import { UiButtonModule } from 'src/app/ui-components/ui-button/ui-button.module';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiTextareaModule } from 'src/app/ui-components/ui-textarea/ui-textarea.module';



@NgModule({
  declarations: [
    ReadingListComponent,
    ReadingListElementComponent,
    AddNewBookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule,
    ReadingListRoutingModule,
    UiInputModule,
    UiButtonModule,
    UiTextareaModule
  ]
})
export class ReadingListModule { }
