import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBannerComponent } from './photo-banner.component';

describe('PhotoBannerComponent', () => {
  let component: PhotoBannerComponent;
  let fixture: ComponentFixture<PhotoBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
