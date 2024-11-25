import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { CollectionsEffects } from '../collections.effects';
import { UnsplashService } from '@app/services';
import { provideMockStore } from '@ngrx/store/testing';
import { CollectionsActions } from '@app/store';
import { cold } from 'jasmine-marbles';
import { mockCollections } from '@app/store/collections/__tests__/mock';
import { ICollection } from '@app/interfaces';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';

describe('CollectionsEffects', () => {
  let actions$: Observable<any>;
  let effects: CollectionsEffects;
  let unsplashService: jasmine.SpyObj<UnsplashService>;

  const mockApiSuccessResponse = {
        type: 'success',
        status: 200,
        response: {
          results: mockCollections,
          total: 2
        },
        originalResponse: new Response()
  } as ApiResponse<{   results: ICollection[];   total: number; }>;

  const mockApiErrorResponse = {
    type: 'error',
    status: 500,
    source: 'api',
    originalResponse: new Response(),
    errors: ['Internal Server Error'] as string[],
  } as ApiResponse<never>;

  beforeEach(() => {
    unsplashService = jasmine.createSpyObj('UnsplashService', ['listCollections']);

    TestBed.configureTestingModule({
      providers: [
        CollectionsEffects,
        provideMockActions(() => actions$),
        provideMockStore,
        { provide: UnsplashService, useValue: unsplashService }
      ]
    });
    effects = TestBed.inject(CollectionsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadCollections$', () => {
    it('should dispatch loadCollectionsSuccess when api response type is success', () => {
      actions$ = of({ type: '[Collections] Load Collections' });
      const collections = mockCollections;
      const total = 2;
      unsplashService.listCollections.withArgs(1, 9).and.returnValue(of(mockApiSuccessResponse));
      actions$ = cold('-a-', { a: CollectionsActions.loadCollections({ page: 1, perPage: 9 }) });
      const expected = cold('-b', {
        b: CollectionsActions.loadCollectionsSuccess({ collections, total })
      });
      expect(effects.loadCollections$).toBeObservable(expected);
    });

    it('should dispatch loadCollectionsFailure when api response type is error', () => {
      actions$ = cold('-a-', { a: CollectionsActions.loadCollections({ page: 1, perPage: 9 }) });
      unsplashService.listCollections.withArgs(1, 9).and.returnValue(of(mockApiErrorResponse));
      const expected = cold('-b', {
        b: CollectionsActions.loadCollectionsFailure({
          error: mockApiErrorResponse.errors || ['Unknown error'],
        }),
      });
      expect(effects.loadCollections$).toBeObservable(expected);
    });
  });
});
