import {
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];


if (ProcessingInstruction.env.NODE_ENV !== 'production') {
    const reduxLogger = require('redux-logger');
    middleware.push(reduxLogger.createLogger());
}

export default function configureStore(initialState, reducers, history) {
    middleware.push(routerMiddleware(history));
    if (history) {
        middleware.push(routerMiddleware(history));
    }
    return createStore(
        combineReducers({ ...reducers, form: formReducer, router: connectRouter(history) }),
        initialState,
        applyMiddleware(...middleware),
    );
}


