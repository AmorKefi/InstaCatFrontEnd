import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';

const routes: Routes = [
  {
    path: '',
    component: VotePageComponent
  },
  {
    path: 'ranking',
    component: RankingPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
