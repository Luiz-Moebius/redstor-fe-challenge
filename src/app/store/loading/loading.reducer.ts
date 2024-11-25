import { createReducer, on } from '@ngrx/store';
import { LoadingActions } from '@app/store/loading/loading.actions';
import { CollectionsActions } from '@app/store/collections/collections.actions';

export const loadingFeatureKey = 'loading';

export interface State {
  [loadingKey: string]: boolean;
}

const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(LoadingActions.startLoading, (state, { key }) => ({ ...state, [key]: true })),
  on(LoadingActions.stopLoading, (state, { key }) => ({ ...state, [key]: false })),
  on(CollectionsActions.loadCollections, (state) => ({ ...state, ['loadingCollections']: true })),
  on(CollectionsActions.loadCollectionsSuccess, CollectionsActions.loadCollectionsFailure, (state) => ({ ...state, ['loadingCollections']: false }))
);
