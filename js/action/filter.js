/**
 * Created by harveyprince on 16/9/5.
 */
import * as TYPE from './types';

export const search = (key = '') => {
    return {
        type: TYPE.SEARCH_KEY,
        content: key
    }
}

export const tag_filter = (key = 'ALL') => {
    return {
        type: TYPE.TAG_KEY,
        content: key
    }
}