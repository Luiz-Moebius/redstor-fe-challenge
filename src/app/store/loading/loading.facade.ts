import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadingSelectors } from './loading.selectors';
import { LoadingActions } from '@app/store/loading/loading.actions';

@Injectable({ providedIn: 'root' })
export class LoadingFacade {
  private readonly store: Store = inject(Store);

  readonly anyLoading$ = this.store.selectSignal(LoadingSelectors.selectAnyLoading);
  startLoading(key: string ) {
    this.store.dispatch(LoadingActions.startLoading({ key }));
  }
  stopLoading(key: string ) {
    this.store.dispatch(LoadingActions.stopLoading({ key }));
  }
}
