import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Cat } from '../models/cat.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private readonly apiBase = environment.apiBaseUrl;
  private catsSubject = new BehaviorSubject<Cat[]>([]);
  cats$ = this.catsSubject.asObservable();
  http: HttpClient = inject(HttpClient);
  constructor() {
    this.loadCats();
   }

  private loadCats(): void {
    this.http
      .get<Cat[]>(this.apiBase + '/cats')
      .subscribe({
        next: (cats) => {
          this.catsSubject.next(cats);
        },
        error: (err) => console.error('Erreur chargement chats', err)
      });
  }
  
  getTwoRandomCats(): [Cat, Cat] | null {
    const cats = this.catsSubject.value;
    if (cats.length < 2) return null;

    const firstIndex = Math.floor(Math.random() * cats.length);
    let secondIndex = firstIndex;
    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * cats.length);
    }

    return [cats[firstIndex], cats[secondIndex]];
  }
}
