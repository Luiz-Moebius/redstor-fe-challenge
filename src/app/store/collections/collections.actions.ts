import { ICollection } from '@app/interfaces';
import { createAction, props } from '@ngrx/store';
import { Errors } from 'unsplash-js/dist/helpers/errors';

export namespace CollectionsActions {
  export const loadCollections = createAction(
    '[Collections] Load Collections',
    props<{ page: number, perPage: number }>()
  );
  export const loadCollectionsSuccess = createAction(
    '[Collections] Load Collections success',
    props<{ collections: ICollection[], total: number }>()
  );
  export const loadCollectionsFailure = createAction(
    '[Collections] Load Collections failure',
    props<{ error: Errors }>()
  );
}
