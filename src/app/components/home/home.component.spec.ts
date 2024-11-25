import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CollectionsFacade } from '@app/store';
import { signal } from '@angular/core';
import { ICollection } from '@app/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockCollectionsFacade {
  collections$ = signal<ICollection[]>([]);
  total$ = signal<number>(10);
  loadCollections(page: number, perPage: number) {
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: CollectionsFacade, useClass: MockCollectionsFacade }],
      imports: [HomeComponent, BrowserAnimationsModule],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
