import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import quoteReducer from './quoteReducer';

export default combineReducers({
    service: serviceReducer,
    quote: quoteReducer
});
