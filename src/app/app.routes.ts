import { Routes } from '@angular/router';
import { CollectionComponent } from '@app/components';
import { PageNotFoundComponent } from '@app/components/page-not-found/page-not-found.component';
import { CollectionsEffects, collectionsFeatureKey, reducer } from '@app/store/index';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { loadingFeatureKey, loadingReducers } from '@app/store/loading';
import { TranslatePaginatorService } from '@app/services/translation.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./components/home').then(c => c.HomeComponent),
    data: { breadcrumbs: ['collections'] },
    title: 'Redstor | Collections',
    providers: [
      { provide: MatPaginatorIntl, useClass: TranslatePaginatorService },
      provideState(collectionsFeatureKey, reducer),
      provideState(loadingFeatureKey, loadingReducers),
      provideEffects(CollectionsEffects),
    ],
  },
  { path: 'collection/:collectionId',
    component: CollectionComponent,
    data: { breadcrumbs: ['collections', 'collection'] },
    title: 'Redstor | Collection',
  },
  {
    path: 'collection/:collectionId/photo/:photoId',
    loadComponent: () => import('./components/photo/photo.component').then(c => c.PhotoComponent),
    data: { breadcrumbs: ['collections', 'collection', 'photo'] },
    title: 'Redstor | Photo',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
