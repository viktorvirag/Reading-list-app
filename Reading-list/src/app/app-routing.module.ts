import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'books', loadChildren: () => import('./main-modules/reading-list/reading-list.module').then((m) => m.ReadingListModule) },
  { path: '',   redirectTo: 'books', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
