import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'books', loadChildren: () => import('./main-modules/reading-list/reading-list.module').then((m) => m.ReadingListModule) },
  { path: '',   redirectTo: 'books', pathMatch: 'full' },
  { path:  '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
