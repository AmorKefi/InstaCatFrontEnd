import { Component, inject } from '@angular/core';
import { CatsService } from '../../core/services/cats.service';
import { map, Observable } from 'rxjs';
import { Cat } from '../../core/models/cat.model';

@Component({
  selector: 'app-ranking-page',
  standalone: false,
  templateUrl: './ranking-page.component.html',
  styleUrl: './ranking-page.component.scss'
})
export class RankingPageComponent {
  private catsService: CatsService = inject(CatsService);
  cats$: Observable<Cat[]> = this.catsService.cats$.pipe(
    map((cats) => [...cats].sort((a, b) => b.score - a.score))
  );
}
