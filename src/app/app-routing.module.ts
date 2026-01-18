import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotePageComponent } from './pages/vote-page/vote-page.component';

const routes: Routes = [
  {
    path:'',
    component: VotePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
