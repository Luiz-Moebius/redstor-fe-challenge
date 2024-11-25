import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { NgIf, TitleCasePipe } from '@angular/common';
import { Breadcrumb } from '@app/interfaces';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    TitleCasePipe,
    TranslatePipe
  ],
  templateUrl: './breadcrumbs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  breadcrumbs$ = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => this.createBreadcrumbs(event.urlAfterRedirects))
    )
  );

  private createBreadcrumbs(url: string) {
    const routeBreadcrumbs: string[] = this.activatedRoute.root.firstChild?.snapshot.data['breadcrumbs'];
    if (!routeBreadcrumbs) {
      return [{ label: 'collections', url: '/' }] as Breadcrumb[];
    }
    return routeBreadcrumbs.map((breadcrumb, index) => ({
      label: breadcrumb,
      url: url.split(routeBreadcrumbs[index + 1])[0]
    }));
  }
}
