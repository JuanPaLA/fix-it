import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import quoteReducer from './quoteReducer';
import jobReducer from './jobReducer';

export default combineReducers({
    service: serviceReducer,
    quote: quoteReducer,
    job: jobReducer    
});
