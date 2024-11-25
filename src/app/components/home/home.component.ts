import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CollectionsFacade } from '@app/store';
import { ImageCardComponent } from '@app/components/reusable-components/image-card/image-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    MatPaginator,
    ImageCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  collectionsFacade = inject(CollectionsFacade);

  collections$ = this.collectionsFacade.collections$;
  totalItems$ = this.collectionsFacade.total$;
  pageIndex$ = signal<number>(0);
  pageSize$ = signal<number>(9);

  // Todo Using effect  you could replace the need for ngOnInit and loadCollections call in pageChangeEvent,
  //  but it's not recommended to be used for this purpose, although in Angular v19 they introduced
  //  the new Resource API that should be used in this scenario
  // constructor() {
  //   effect(() => {
  //     this.collectionsFacade.loadCollections(this.pageIndex$() + 1, this.pageSize$())
  //   });
  // }

  ngOnInit(): void {
    this.collectionsFacade.loadCollections(this.pageIndex$() + 1, this.pageSize$());
  }

  pageChangeEvent(event: PageEvent) {
    this.pageIndex$.set(event.pageIndex);
    this.pageSize$.set(event.pageSize);
    this.collectionsFacade.loadCollections(this.pageIndex$() + 1, this.pageSize$());
  }
}
