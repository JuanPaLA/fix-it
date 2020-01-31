import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import quoteReducer from './quoteReducer';
import budgetReducer from './budgetReducer';
import jobReducer from './jobReducer'
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    service: serviceReducer,
    quote: quoteReducer,
    budget: budgetReducer,
    job: jobReducer,
    auth: authReducer,
    errors: errorReducer
});
