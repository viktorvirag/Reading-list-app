import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';

const routes: Routes = [
  { path: '', component: ReadingListComponent },
  { path: 'new', component: AddNewBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingListRoutingModule { }
