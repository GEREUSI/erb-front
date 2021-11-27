import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { USER_TOKEN_KEY } from './shared/models/user';
import { loadUserData, setUserToken } from './store/actions';
import { getIsUserDataLoading } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isUserLoading$ = this.store.select(getIsUserDataLoading);
  public token = localStorage.getItem(USER_TOKEN_KEY) as string

  constructor(private store: Store) {}

  ngOnInit(): void {
    if(this.token){
      this.store.dispatch(setUserToken({ token: this.token }))
      this.store.dispatch(loadUserData({ token: this.token }))  
    }
  }
}
