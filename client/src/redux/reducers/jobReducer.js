import {POST_JOB, 
    GET_JOBS, 
    GET_JOB_BY_BUDGET
} from './../actions/types';

const initialState = {
    jobs : [
        {precio: 100 }
    ]
}

export default function(state = initialState, action) {
    switch(action.type){
        case POST_JOB:
            return {
                ...state,
                jobs: action.payload
            }
            case GET_JOBS:
            return {
                ...state,
                jobs: action.payload
            }
            case GET_JOB_BY_BUDGET:
            return {
                ...state,
                jobs: action.payload
            }
            default:
                return state;
    }
}