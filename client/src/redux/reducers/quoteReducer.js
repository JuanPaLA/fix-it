import {GET_QUOTE_BY_FIELD, ADD_QUOTE } from '../actions/types';

const initialState = {
    quotes : [
        {descripcion: 'initialDesc'}
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_QUOTE_BY_FIELD:
            return {
                ...state,
                quotes: action.payload
            }
            default:
                return state;
    }
}

