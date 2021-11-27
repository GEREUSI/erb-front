import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getIsAuthenticatedUser, getIsUserDataLoading } from "src/app/store/selectors";

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return combineLatest([this.store.select(getIsAuthenticatedUser), this.store.select(getIsUserDataLoading)]).pipe(map(([isAuthenticated, isLoading]) => isAuthenticated || isLoading) ) ;
  }
}