import { createAction, props } from '@ngrx/store';

export namespace LoadingActions {
  export const startLoading = createAction('[Loading] Start', props<{ key: string }>());
  export const stopLoading = createAction('[Loading] Stop', props<{ key: string }>());
}
