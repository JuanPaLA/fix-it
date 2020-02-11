import { 
    GET_CHAT_BY_JOBID
} from "../actions/types";

const initialState = {
    chats : {}

    
};

export default function (state= initialState, action ) {
    switch(action.type) {
        case GET_CHAT_BY_JOBID:
            return {
                ...state,
                chats: action.payload
            }
            default:
                return state;
    }
}