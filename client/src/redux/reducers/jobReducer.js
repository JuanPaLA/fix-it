import { GET_JOB_BY_QUOTE } from '../actions/types';

const initialState = {
    jobs : [
        {precio: 100 }
    ]
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_JOB_BY_QUOTE:
            return {
                ...state,
                jobs: action.payload
            }
            default:
                return state;
    }
}