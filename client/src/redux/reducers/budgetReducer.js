import { GET_BUDGET_BY_QUOTE } from '../actions/types';

const initialState = {
    budgets : [
        {precio: 100 }
    ]
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_BUDGET_BY_QUOTE:
            return {
                ...state,
                budgets: action.payload
            }
            default:
                return state;
    }
}