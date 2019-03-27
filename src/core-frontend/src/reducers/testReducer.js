/*
    Test Reducer File (testing reducer implementation)

*/


function testReducer (state = {}, action){
    switch(action.type){
        case 'SIMPLE_ACTION':
            return {
                result: action.payload
            }
        default:
            return state
    }
};

export {testReducer}