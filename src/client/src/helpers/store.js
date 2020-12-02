import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import rootReducer from '../reducers';

const reducer = combineReducers({
    rootReducer,
    form: formReducer
});

const store = createStore(reducer, applyMiddleware(reduxThunk))

export default store;