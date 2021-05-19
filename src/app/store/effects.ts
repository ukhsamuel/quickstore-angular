import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes } from './actions';
// import { FruitsService } from '../fruits.service';
// import fruits from '../../../fruits';
import { ProductService, CartService} from '../core/services/';

@Injectable()
export class CartEffects {
    constructor(
    private actions$: Actions,
    private cartService: CartService,
    ) {}

    // @Effect()
    // loadFruit$ = this.actions$.pipe(
    //     ofType(ActionTypes.LoadItems),
    //     mergeMap(() => 
    //     this.fruitsService.getAll().pipe(
    //         map(fruits => {
    //             return {
    //                 type: ActionTypes.LoadSuccess,
    //                 payload: fruits
    //             }
    //         }),
    //         catchError(() => EMPTY)
    //     )
    //     )
    // )

}

