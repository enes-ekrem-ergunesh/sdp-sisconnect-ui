import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginWebPage } from './login-web.page';

describe('LoginWebPage', () => {
  let component: LoginWebPage;
  let fixture: ComponentFixture<LoginWebPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
