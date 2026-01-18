import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePageComponent } from './vote-page.component';
import { Cat } from '../../core/models/cat.model';
import { CatsService } from '../../core/services/cats.service';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

class CatsServiceMock {
  cats$ = new BehaviorSubject<Cat[]>([]);

  getTwoRandomCats = jasmine
    .createSpy('getTwoRandomCats')
    .and.callFake(() => {
      const cats = this.cats$.value;
      return cats.length >= 2 ? [cats[0], cats[1]] : null;
    });

  voteFor = jasmine.createSpy('voteFor');
}

describe('VotePageComponent', () => {
  let component: VotePageComponent;
  let fixture: ComponentFixture<VotePageComponent>;
  let catsService: CatsServiceMock;

  const mockCats: Cat[] = [
    { id: '1', url: 'url-1', score: 10 },
    { id: '2', url: 'url-2', score: 20 },
    { id: '3', url: 'url-3', score: 5 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotePageComponent],
      providers: [{ provide: CatsService, useClass: CatsServiceMock }, provideRouter([]),
      provideLocationMocks(),provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(VotePageComponent);
    component = fixture.componentInstance;
    catsService = TestBed.inject(CatsService) as unknown as CatsServiceMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pick a pair of cats on init', () => {
    catsService.cats$.next(mockCats);

    fixture.detectChanges();

    expect(catsService.getTwoRandomCats).toHaveBeenCalled();
    expect(component.leftCat).toEqual(mockCats[0]);
    expect(component.rightCat).toEqual(mockCats[1]);
  });

  it('should call voteFor when clicking like button', () => {
    catsService.cats$.next(mockCats);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(
      By.css('.vote__button')
    );
    expect(buttons.length).toBe(2);

    buttons[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(catsService.voteFor).toHaveBeenCalledWith('1');
    expect(catsService.getTwoRandomCats).toHaveBeenCalledTimes(1);
  });
});