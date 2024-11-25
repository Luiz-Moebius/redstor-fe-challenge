import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionComponent } from '@app/components';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore()],
      imports: [RouterModule.forRoot([]), CollectionComponent, TranslateModule.forRoot()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
