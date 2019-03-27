/*
    Redux Store:
        - Hold current application state
        - Handles dispatches and corresponding
          state changes 
        - updates to new state for view

*/

import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';


// Include initial states
function configureStore(initialState = {}){
    return createStore( rootReducer, initialState, applyMiddleware(thunk));
}

export {configureStore};