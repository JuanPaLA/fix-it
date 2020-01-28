import {GET_QUOTE_BY_FIELD, GET_QUOTES, POST_QUOTE } from '../actions/types';

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
        case GET_QUOTES:
            return {
                ...state,
                quotes: action.payload
            }
        case POST_QUOTE:
            return {
                ...state,
                quotes: action.payload
            }
            default:
                return state;
    }
}

