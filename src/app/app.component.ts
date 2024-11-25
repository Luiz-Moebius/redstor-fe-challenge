import { Component, inject } from '@angular/core';
import { LoadingFacade } from '@app/store/loading';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '@app/components/breadcrumbs';
import { MatToolbar } from '@angular/material/toolbar';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [TranslateModule, MatProgressBar, RouterOutlet, BreadcrumbsComponent, MatToolbar, RouterLink, NgIf],
  standalone: true
})
export class AppComponent {
  private readonly loadingFacade = inject(LoadingFacade);
  private readonly translateService = inject(TranslateService);

  isLoading$ = this.loadingFacade.anyLoading$;

  constructor() {
    this.translateService.addLangs(['en', 'pt']);
    this.translateService.setDefaultLang('pt');
    this.translateService.use('pt');
  }
}
