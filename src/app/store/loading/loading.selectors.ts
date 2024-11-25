import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoading from './loading.reducer';


export namespace LoadingSelectors {
  export const selectLoadingState = createFeatureSelector<fromLoading.State>('loading');
  export const selectIsLoading = (key: string) => createSelector(selectLoadingState, (state) => state[key] || false);
  export const selectAnyLoading = createSelector(selectLoadingState, (state) => Object.values(state['loading'] ?? {}).some((value) => value));
  export const selectFullLoadingState = createSelector(selectLoadingState, (state) => state);
}
