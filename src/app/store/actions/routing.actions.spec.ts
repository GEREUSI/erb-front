import { ROUTES } from '../../constants/routes.const';
import { go, RoutingActions } from './routing.actions';

describe('routing actions', () => {
    it('it should create go action', () => {
        const action = go({ path: ROUTES.Home });
        expect(action).toEqual({
            path:  ROUTES.Home,
            type: RoutingActions.Go
        });
    });
});
