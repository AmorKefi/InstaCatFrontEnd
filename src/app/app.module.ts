import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VotePageComponent } from './pages/vote-page/vote-page.component';
import { provideHttpClient } from '@angular/common/http';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';

@NgModule({
  declarations: [
    AppComponent,
    VotePageComponent,
    RankingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
