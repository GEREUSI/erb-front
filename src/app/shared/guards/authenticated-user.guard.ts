import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getIsAuthenticatedUser } from "src/app/store/selectors";

@Injectable({
    providedIn: 'root',
  })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getIsAuthenticatedUser);
  }
}