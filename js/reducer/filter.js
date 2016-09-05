/**
 * Created by harveyprince on 16/9/5.
 */
import * as TYPE from '../action/types';

export const filter = (state = {
    search_key:'',
    finish_key: 'ALL'
}, action) => {
    switch (action.type) {
        case TYPE.SEARCH_KEY:
            return {
                ...state,
                search_key: action.content
            };
        case TYPE.TAG_KEY:
            return {
                ...state,
                finish_key: action.content
            };
        default:
            return state;
    }
}