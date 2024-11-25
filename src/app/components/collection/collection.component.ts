import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { MatIcon } from '@angular/material/icon';
import { ImageCardComponent } from '@app/components/reusable-components/image-card/image-card.component';
import { LoadingFacade } from '@app/store/loading';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  standalone: true,
  imports: [
    ImageCardComponent,
    MatIcon,
    TranslatePipe,
    ImageCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {

  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly loadingFacade = inject(LoadingFacade);
  private readonly translationService = inject(TranslateService);

  photos$ = signal<IPhoto[]>([] as IPhoto[]);
  currentLanguage$ = toSignal(
    this.translationService.onLangChange.pipe(map(e => e.lang)),
    {initialValue: this.translationService.currentLang},
  );

  ngOnInit(): void {
    this.loadPhotos();
  }

  private loadPhotos() {
    this.loadingFacade.startLoading('loadCollection');
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    this.unsplashService.listCollectionPhotos(collectionId).subscribe(photos => {
      this.photos$.set(photos?.response?.results ?? []);
      this.loadingFacade.stopLoading('loadCollection');
    });
  }
}
