import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ROUTES } from '../shared/constants/routes.const';
import { go } from '../store/actions';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<{}>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [provideMockStore()],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToHome', () => {
    it('should dispatch go action with home path', () => {
      component.goToHome();

      expect(store.dispatch).toHaveBeenCalledWith(go({ path: ROUTES.Home }));
    });
  });

  describe('goToSignIn', () => {
    it('should dispatch go action with sign in path', () => {
      component.goToSignIn();

      expect(store.dispatch).toHaveBeenCalledWith(go({ path: ROUTES.SignIn }));
    });
  });

  describe('goToSignUp', () => {
    it('should dispatch go action with sign up path', () => {
      component.goToSignUp();

      expect(store.dispatch).toHaveBeenCalledWith(go({ path: ROUTES.SignUp }));
    });
  });
});
