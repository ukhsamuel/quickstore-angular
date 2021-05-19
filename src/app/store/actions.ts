import {Action} from '@ngrx/store';
import { CartItem} from './../_shared/interfaces';




export enum ActionTypes {
    Add = '[CartItem] Add to cart',
    Update = '[CartItem] Update cart',
    Remove = '[CartItem] Remove to cart',
    LoadItems = '[CartItem] Load items from server',
    LoadSuccess = '[CartItem] Load server',
}

export class AddToCart implements Action{
    readonly type = ActionTypes.Add;
    constructor(public payload: CartItem){ 
    }
}

export class UpdateCart implements Action{
    readonly type = ActionTypes.Update;
    constructor(public payload: CartItem){ 
    }
}

export class GetItems implements Action{
    readonly type = ActionTypes.LoadItems;
}


export class RemoveFromCart implements Action{
    readonly type = ActionTypes.Remove;

    constructor(public payload: CartItem){}
}

export class LoadItems implements Action{
    readonly type = ActionTypes.LoadSuccess;

    constructor(public payload: CartItem[]){}
}

export type ActionsUnion = AddToCart | UpdateCart | RemoveFromCart | LoadItems | GetItems;

