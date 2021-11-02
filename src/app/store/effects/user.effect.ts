import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ROUTES } from '../../shared/constants/routes.const';
import { SignInResponse } from '../../shared/models/sign-in';
import { SignUpResponse } from '../../shared/models/sign-up';
import { SignInService } from '../../shared/services/sign-in.service';
import { SignUpService } from '../../shared/services/sign-up.service';
import { go, signIn, signInFail, signInSuccess, signUp, signUpFail, signUpSuccess } from '../actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private signUpService: SignUpService,
    private signInService: SignInService
  ) {}

  public signUpUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUp),
        tap(({ payload }) => {
          this.signUpService.signUp(payload).subscribe(
            (signUpResponse: SignUpResponse) => {
              this.store.dispatch(signUpSuccess({ payload: signUpResponse }));
              this.store.dispatch(go({ path: ROUTES.SignIn}));
            },
            (errorResponse: HttpErrorResponse) => {
              this.store.dispatch(signUpFail({ errors: errorResponse.error.errors }));
            }
          );
        })
      ),
    { dispatch: false }
  );
  public signInUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signIn),
        tap(({ payload }) => {
          this.signInService.signIn(payload).subscribe(
            (signInResponse: SignInResponse) => {
              this.signInService.getUser(signInResponse.token).subscribe((userData) => {
                this.store.dispatch(signInSuccess({ payload: {...signInResponse, user: userData} }));
                this.store.dispatch(go({ path: ROUTES.Home}));
              },
              () => {
                this.store.dispatch(signInSuccess({ payload: signInResponse }));
                this.store.dispatch(go({ path: ROUTES.Home}));
              })              
            },
            (errorResponse: HttpErrorResponse) => {
              this.store.dispatch(signInFail({ errors: errorResponse.error.errors }));
            }
          );
        })
      ),
    { dispatch: false }
  );
  public redirectToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess, signUpSuccess),
        tap(() => {
          this.store.dispatch(go({ path: ROUTES.Home }));
        })
      ),
    { dispatch: false }
  );
}
