import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  { path: '', component: ReadingListComponent },
  { path: 'new', component: AddNewBookComponent },
  { path: 'edit/:id', component: EditBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingListRoutingModule { }
