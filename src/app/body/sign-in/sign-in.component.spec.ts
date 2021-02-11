import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { ROUTES } from '../../shared/constants/routes.const';
import { go, signIn } from '../../store/actions';
import { getIsSignInLoading, getSignInErrors, getSignInHasErrors } from '../../store/selectors';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let store: MockStore<{}>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [provideMockStore(), { provide: FormBuilder, useValue: formBuilder }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.overrideSelector(getIsSignInLoading, false);
    store.overrideSelector(getSignInHasErrors, false);
    store.overrideSelector(getSignInErrors, '');

    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set initial values', () => {
      component.ngOnInit();
      expect(component.isLoading$).toBeObservable(cold('a', { a: false }));
      expect(component.hasErrors$).toBeObservable(cold('a', { a: false }));
      expect(component.errors$).toBeObservable(cold('a', { a: '' }));
      expect(component.signInForm.getRawValue()).toEqual({
        email: '',
        password: '',
      });
    });
  });

  describe('goToHome', () => {
    it('should dispatch action go with home path', () => {
      component.goToHome();
      expect(store.dispatch).toHaveBeenCalledWith(go({ path: ROUTES.Home }));
    });
  });

  describe('onSubmit', () => {
    it('if form is valid should dispatch action', () => {
      Object.defineProperty(component.signInForm, 'valid', {
        get: () => true,
      });
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(signIn({ payload: { email: '', password: '' } }));
    });
    it('if form is invalid should not dispatch action', () => {
      component.onSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
