import {
    POST_MESSAGE
} from '../actions/types';

const initialState = {
    messages: [

    ]
}

export default function(state = initialState, action) {
    switch(action.type) {
        case POST_MESSAGE:
            return{
                ...state,
                messages: action.payload
            }
            default:
                return state;
    }
}