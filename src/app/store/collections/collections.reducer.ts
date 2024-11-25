import { ICollection } from '@app/interfaces';
import { createReducer, on } from '@ngrx/store';
import { CollectionsActions } from './collections.actions';
import { Errors } from 'unsplash-js/dist/helpers/errors';

export const collectionsFeatureKey = 'collections';

export interface State {
  collections: ICollection[];
  total: number;
  error: Errors | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: State = {
  collections: [],
  total: 0,
  error: null,
  status: 'pending',
};

export const reducer = createReducer(
  initialState,
  on(CollectionsActions.loadCollections, (state: State) => ({
    ...state,
    status: 'loading' as 'loading'
  })),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections, total}) => ({
    ...state,
    collections,
    total,
    error: null,
    status: 'success' as 'success',
  })),
  on(CollectionsActions.loadCollectionsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as 'error'
  }))
);
