import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { RoutingEffects } from './routing.effects';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/constants/routes.const';
import { go } from '../actions';

describe('RoutingEffects', () => {
    let actions$: Observable<Action>;
    let effects: RoutingEffects;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RoutingEffects,
                provideMockActions(() => actions$),
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();

        router = TestBed.inject(Router);
        effects = TestBed.inject(RoutingEffects);
        spyOn(router, 'navigate');
    });

    it('should be created', () => {
        expect(effects).toBeDefined();
    });

    describe('goToSpecificRoute', () => {
        it('should navigate to different route', () => {
            actions$ = of(go({ path: ROUTES.Home }));

            effects.goToSpecificRoute$.subscribe();
            expect(router.navigate).toHaveBeenCalledWith([ROUTES.Home]);
        });
    });

});
