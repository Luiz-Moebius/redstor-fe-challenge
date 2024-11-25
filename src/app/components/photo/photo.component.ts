import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { LoadingFacade } from '@app/store/loading';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styles: ['.open-in-new { display: flex; text-decoration: none; color: inherit; position: absolute; bottom: 3%; right: 3%; background-color: #fafafa; padding: .5rem; border-radius: 100%}'],
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatIcon,
    NgOptimizedImage,
    TitleCasePipe,
    TranslatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent {
  private readonly unsplashService = inject(UnsplashService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly loadingFacade = inject(LoadingFacade);
  private readonly translationService = inject(TranslateService);

  photo$ = toSignal(this.activatedRoute.params.pipe(
    switchMap(params => {
      const photId = params['photoId'];
      this.loadingFacade.startLoading('loadPhoto');
      return this.unsplashService.getPhoto(photId).pipe(
        map(apiResponse => apiResponse.response as IPhoto & typeof apiResponse.response),
        catchError(_error => of(null)),
        finalize(() => this.loadingFacade.stopLoading('loadPhoto'))
      )
    })
  ))

  currentLanguage$ = toSignal(
    this.translationService.onLangChange.pipe(map(e => e.lang)),
    {initialValue: this.translationService.currentLang},
  );
}
