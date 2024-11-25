import { inject, Injectable } from '@angular/core';
import { UnsplashService } from '@app/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CollectionsActions } from './collections.actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class CollectionsEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly unsplash: UnsplashService = inject(UnsplashService);
  loadCollections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.loadCollections),
      switchMap(({ page, perPage }) => {
        return this.unsplash.listCollections(page, perPage).pipe(
          map(result =>
            result.type === 'success'
              ? CollectionsActions.loadCollectionsSuccess({
                collections: result.response.results || [],
                total: result.response.total
              })
              : CollectionsActions.loadCollectionsFailure({ error: result.errors })
          ));
      }))
  );
}
