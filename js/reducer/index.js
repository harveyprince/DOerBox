/**
 * Created by harveyprince on 16/9/5.
 */
import {combineReducers} from 'redux';
import {todos} from './todo';
import {filter} from './filter';

export default combineReducers({
    todos,
    filter
});