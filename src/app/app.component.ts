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

  constructor(private store: Store) {}

  ngOnInit(): void {
    const token = localStorage.getItem(USER_TOKEN_KEY) as string
    if(token){
      this.store.dispatch(setUserToken({ token }))
      this.store.dispatch(loadUserData({token}))  
    }
  }
}
