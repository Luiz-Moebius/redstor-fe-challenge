import { ActionReducerMap } from '@ngrx/store';
import * as fromLoading from './loading.reducer';

export * from './loading.actions';
export * from './loading.reducer';
export * from './loading.selectors';
export * from './loading.facade';

export interface State {
  [key: string]: fromLoading.State;
}

export const loadingReducers: ActionReducerMap<State> = {
  loading: fromLoading.reducer
};
