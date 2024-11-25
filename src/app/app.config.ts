import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideStore, StoreModule } from '@ngrx/store';
import { CollectionsEffects, collectionsFeatureKey, metaReducers, reducers } from '@app/store/collections/index';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { loadingReducers } from '@app/store/loading';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, 'assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      BrowserAnimationsModule,

      // Store
      StoreModule.forRoot({}),
      StoreModule.forRoot(loadingReducers),
      StoreModule.forFeature(collectionsFeatureKey, reducers),
      EffectsModule.forRoot([]),
      EffectsModule.forFeature(CollectionsEffects),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: false, // Restrict extension to log-only mode
      }),

      // Translation
      [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      })],

    ),
    provideStore({ ...loadingReducers, ...reducers }, { metaReducers })
  ]
};
