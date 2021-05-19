import { ActionsUnion, ActionTypes } from './actions';

export const initialState = {
    items: [],
    cart: []
}

export function CartReducer(state = initialState, action: ActionsUnion){
    switch(action.type){
        case ActionTypes.LoadSuccess:
            return {
                ...state,
                items: [...action.payload]
            }

        case ActionTypes.Add:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        
        case ActionTypes.Update:
            console.log(777)
            console.log(state.cart)
            // get an array of all ids and find the index of the required item
            let index = state.cart.map(item => item.productId)
                        .indexOf(action.payload.productId);

                        console.log('index ', action.payload.quantity + 1)
                        console.log('state.cart[index] ', state.cart[index])
            return { 
                ...state, 
                cart: [
                    ...state.cart.slice(0,index),
                    action.payload,
                    ...state.cart.slice(index+1)
                    ]
            }
            
        case ActionTypes.Remove:
            console.log(action.payload)
            return {
                ...state,
                cart: [...state.cart.filter(item => item.productId !== action.payload)]
            };
        
            default:
            return state;
    }
}