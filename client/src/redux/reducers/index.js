import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import quoteReducer from './quoteReducer';
import budgetReducer from './budgetReducer';
import jobReducer from './jobReducer'
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    service: serviceReducer,
    quote: quoteReducer,
    budget: budgetReducer,
    job: jobReducer,
    chat: chatReducer,
    message: messageReducer,
    auth: authReducer,
    errors: errorReducer
});
