/*
    Combines all defined reducers into a single
    index reducer (simplify export/import)
*/

import {combinReducers} from 'redux'; 
import testReducer from './testReducer'; 

export default combinReducers({
    testReducer
});