/*
    Combines all defined reducers into a single
    index reducer (simplify export/import)
*/

import {combineReducers} from 'redux'; 
import {testReducer} from './testReducer'; 

export default combineReducers({
    testReducer
});