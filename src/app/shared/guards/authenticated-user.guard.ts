import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { filter, map, switchMapTo } from "rxjs/operators";
import { getIsAuthenticatedUser, getIsUserDataLoading } from "src/app/store/selectors";

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    // return combineLatest([this.store.select(getIsAuthenticatedUser), this.store.select(getIsUserDataLoading)])
    return this.store.select(getIsUserDataLoading).pipe(
      filter((isLoading) => !isLoading),
      switchMapTo(this.store.select(getIsAuthenticatedUser)),
      map((isAuthenticated) => isAuthenticated) ) ;
  }
}