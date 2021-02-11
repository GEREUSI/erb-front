import { Action, ActionReducer, ActionReducerMap } from '@ngrx/store';
import { MockStoreConfig } from '@ngrx/store/testing';
import { userReducer, State as UserState, initialState as userInitialState } from './user.reducer';

export {State as UserState} from './user.reducer';

export interface State {
    user: UserState;
}

export const reducers: ActionReducerMap<State> = {
    user: userReducer,
};
