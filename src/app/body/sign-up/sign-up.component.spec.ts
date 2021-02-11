import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { ROUTES } from '../../shared/constants/routes.const';
import { go, signUp } from '../../store/actions';
import { getIsSignUpLoading, getSignUpErrors, getSignUpHasErrors } from '../../store/selectors';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let store: MockStore<{}>;

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [provideMockStore(), { provide: FormBuilder, useValue: formBuilder }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.overrideSelector(getIsSignUpLoading, false);
    store.overrideSelector(getSignUpHasErrors, false);
    store.overrideSelector(getSignUpErrors, '');

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
      expect(component.signUpForm.getRawValue()).toEqual({
        username: '',
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
      Object.defineProperty(component.signUpForm, 'valid', {
        get: () => true,
      });
      component.onSubmit();
      expect(store.dispatch).toHaveBeenCalledWith(signUp({ payload: { email: '', password: '', username: '' } }));
    });
    it('if form is invalid should not dispatch action', () => {
      component.onSubmit();
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
