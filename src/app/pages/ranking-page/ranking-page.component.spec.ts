import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPageComponent } from './ranking-page.component';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { CatsService } from '../../core/services/cats.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class CatsServiceMock {
  cats$ = of([
    { id: '1', url: '1', score: 100 },
    { id: '2', url: '2', score: 50 },
    { id: '3', url: '3', score: 20 },
    { id: '4', url: '4', score: 10 }
  ]);
}

describe('RankingPageComponent', () => {
  let fixture: ComponentFixture<RankingPageComponent>;
  let component: RankingPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RankingPageComponent],
      providers: [
        { provide: CatsService, useClass: CatsServiceMock },
        provideRouter([]),
        provideLocationMocks(),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
