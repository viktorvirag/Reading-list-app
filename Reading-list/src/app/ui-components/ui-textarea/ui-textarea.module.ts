import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTextareaComponent } from './ui-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UiTextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UiTextareaComponent
  ]
})
export class UiTextareaModule { }
