import {GET_SERVICES, ADD_SERVICE } from '../actions/types';

const initialState = {
    services : [
        {especialidad: 'initialSpec'}
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_SERVICES:
            return {
                 ...state,
                 services: action.payload
            }
            default:
            return state;
    }
}