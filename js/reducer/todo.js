/**
 * Created by harveyprince on 16/9/5.
 */
import * as TYPE from '../action/types';

const todo = (state, action) => {
    switch (action.type) {
        case TYPE.ADD_TODO:
            return {
                id: action.id,
                content: action.content,
                tag_finish: action.tag_finish ? action.tag_finish : false
            }
        case TYPE.TOGGLE_TODO:
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                tag_finish: !state.tag_finish
            }
        case TYPE.DEL_TODO:
            return state.id !== action.id;
        default:
            return state;

    }
}

export const todos = (state = [], action) => {
    switch (action.type) {
        case TYPE.ADD_TODO:
            return [
                todo(undefined, action),
                ...state
            ];
        case TYPE.TOGGLE_TODO:
            return state.map((t) =>
                todo(t, action)
            )
        case TYPE.DEL_TODO:
            return state.filter((t) =>
                todo(t, action)
            )
        default:
            return state;
    }
}