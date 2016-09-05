/**
 * Created by harveyprince on 16/9/5.
 */
import * as TYPE from './types';

export const addTodo = (todo = {
    id: -1,
    content: '',
    tag_finish: false
}) => {
    return {
        type: TYPE.ADD_TODO,
        id: todo.id,
        content: todo.content,
        tag_finish: todo.tag_finish
    }
}

export const delTodo = (todo = {
    id: -1
}) => {
    return {
        type: TYPE.DEL_TODO,
        id: todo.id
    }
}

export const toggleTodo = (todo = {
    id: -1
}) => {
    return {
        type: TYPE.TOGGLE_TODO,
        id: todo.id
    }
}