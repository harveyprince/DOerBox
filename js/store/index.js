/**
 * Created by harveyprince on 16/9/5.
 */
import {applyMiddleware, createStore} from 'redux';
import reducers from '../reducer';

const logger = store => next => action => {
    if (typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

let middlewares = [
    logger
];

let createAppStore = applyMiddleware(...middlewares)(createStore);

export default configureStore = () => {
    const store = createAppStore(reducers);
    return store;
}