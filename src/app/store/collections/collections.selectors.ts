import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollections from './collections.reducer';

export namespace CollectionsSelectors {
  export const selectCollectionsFeature = createFeatureSelector<fromCollections.State>(fromCollections.collectionsFeatureKey);

  export const selectCollections = createSelector(selectCollectionsFeature, (state: fromCollections.State) => state.collections);
  export const selectTotal = createSelector(selectCollectionsFeature, (state: fromCollections.State) => state.total);
}
