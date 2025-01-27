import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostMobilePage } from './create-post-mobile.page';

describe('CreatePostMobilePage', () => {
  let component: CreatePostMobilePage;
  let fixture: ComponentFixture<CreatePostMobilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
