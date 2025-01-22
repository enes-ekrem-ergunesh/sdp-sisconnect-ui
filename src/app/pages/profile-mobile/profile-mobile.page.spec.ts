import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMobilePage } from './profile-mobile.page';

describe('ProfileMobilePage', () => {
  let component: ProfileMobilePage;
  let fixture: ComponentFixture<ProfileMobilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
