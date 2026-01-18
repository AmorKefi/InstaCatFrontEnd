import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Cat } from '../../core/models/cat.model';
import { Subscription } from 'rxjs';
import { CatsService } from '../../core/services/cats.service';

@Component({
  selector: 'app-vote-page',
  standalone: false,
  templateUrl: './vote-page.component.html',
  styleUrl: './vote-page.component.scss'
})
export class VotePageComponent implements OnInit, OnDestroy{
  leftCat?: Cat;
  rightCat?: Cat;

  private sub?: Subscription;
  private catsService: CatsService = inject(CatsService);

  constructor() { }

  ngOnInit(): void {
    this.sub = this.catsService.cats$.subscribe({
      next: () => this.pickNewPair()
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  pickNewPair(): void {
    const pair = this.catsService.getTwoRandomCats();
    if (!pair) return;
    [this.leftCat, this.rightCat] = pair;
  }

  like(cat: Cat): void {
    this.catsService.voteFor(cat.id);
    this.pickNewPair();   
    }
  
}
