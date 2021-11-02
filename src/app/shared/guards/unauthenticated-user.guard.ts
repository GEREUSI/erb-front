import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getIsAuthenticatedUser } from "src/app/store/selectors";

@Injectable({
  providedIn: 'root',
})
export class UnauthenticatedGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getIsAuthenticatedUser).pipe(map((isAuthenticated) => !isAuthenticated));
  }
}