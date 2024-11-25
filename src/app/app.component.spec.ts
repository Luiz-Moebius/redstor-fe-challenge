import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbsComponent } from '@app/components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { LoadingFacade } from '@app/store/loading';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

class MockLoadingFacadeFacade {
  anyLoading$ = signal<boolean>(true);
}

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: LoadingFacade, useClass: MockLoadingFacadeFacade }],
      imports: [RouterModule.forRoot([]), AppComponent, MatToolbarModule, MatProgressBarModule, BreadcrumbsComponent, TranslateModule.forRoot()],
      declarations: []
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('title');
  });
});
