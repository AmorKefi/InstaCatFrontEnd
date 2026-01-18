import { TestBed } from '@angular/core/testing';

import { CatsService } from './cats.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { Cat } from '../models/cat.model';


describe('CatsService', () => {
  let service: CatsService;
  let httpMock: HttpTestingController;

  const apiBase = environment.apiBaseUrl;

  const mockCats: Cat[] = [
    { id: '1', url: 'url-1', score: 10 },
    { id: '2', url: 'url-2', score: 20 },
    { id: '3', url: 'url-3', score: 5 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CatsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CatsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load cats on creation', () => {
    let received: Cat[] = [];

    service.cats$.subscribe((c) => (received = c));

    const req = httpMock.expectOne(`${apiBase}/cats`);
    expect(req.request.method).toBe('GET');

    req.flush(mockCats);

    expect(received.length).toBe(3);
    expect(received[0].id).toBe('1');
  });

  it('getTwoRandomCats should return null if less than 2 cats', () => {
    const req = httpMock.expectOne(`${apiBase}/cats`);
    req.flush([{ id: '1', url: 'url-1', score: 0 }]);

    expect(service.getTwoRandomCats()).toBeNull();
  });

  it('voteFor should update score', () => {
    const initial = [...mockCats];
    const updated: Cat = { id: '2', url: 'url-2', score: 21 };

    const req1 = httpMock.expectOne(`${apiBase}/cats`);
    req1.flush(initial);

    let latest: Cat[] = [];
    service.cats$.subscribe((c) => (latest = c));

    service.voteFor('2');

    const voteReq = httpMock.expectOne(`${apiBase}/cats/2/vote`);
    expect(voteReq.request.method).toBe('PUT');
    voteReq.flush(updated);

    const found = latest.find((c) => c.id === '2');
    expect(found?.score).toBe(21);
  });
});