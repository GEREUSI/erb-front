import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { userReducers, State as UserState } from './user.reducer';

export {State as UserState} from './user.reducer';

export interface State {
    user: UserState;
}

export const reducers: ActionReducerMap<State> = {
    user: userReducers,
};
