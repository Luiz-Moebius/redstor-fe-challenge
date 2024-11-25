import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { inject, Injectable } from '@angular/core';

const ITEMS_PER_PAGE = 'pagination.per_page';
const NEXT_PAGE = 'pagination.next_page';
const PREV_PAGE = 'pagination.prev_page';
const FIRST_PAGE = 'pagination.first_page';
const LAST_PAGE = 'pagination.last_page';

@Injectable()
export class TranslatePaginatorService extends MatPaginatorIntl {
  private translate = inject(TranslateService);

  public constructor() {
    super();

    this.translate.onLangChange
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.getAndInitTranslations();
      });

    this.getAndInitTranslations();
  }

  public override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex: number = page * pageSize;
    const endIndex: number = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };

  public getAndInitTranslations(): void {
    this.translate.get([ITEMS_PER_PAGE, NEXT_PAGE, PREV_PAGE, FIRST_PAGE, LAST_PAGE]).subscribe((translation: any) => {
      this.itemsPerPageLabel = translation[ITEMS_PER_PAGE];
      this.nextPageLabel = translation[NEXT_PAGE];
      this.previousPageLabel = translation[PREV_PAGE];
      this.firstPageLabel = translation[FIRST_PAGE];
      this.lastPageLabel = translation[LAST_PAGE];

      this.changes.next();
    });
  }
}
