'use strict';
import { createStore } from 'redux';
import React,{ Component } from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import {TransitionMotion, spring, presets} from 'react-motion';
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                content: action.content,
                tag_finish: action.tag_finish ? action.tag_finish : false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                tag_finish: !state.tag_finish
            }
        case 'DEL_TODO':
            return state.id !== action.id;
        default:
            return state;

    }
}
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                todo(undefined, action),
                ...state
            ];
        case 'TOGGLE_TODO':
            return state.map((t) =>
                todo(t, action)
            )
        case 'DEL_TODO':
            return state.filter((t) =>
                todo(t, action)
            )
        default:
            return state;
    }
}

const store = createStore(todos);
class TodoInput extends Component {
    render() {
        return (
            <form
                onSubmit={(e)=>{
                    var that = this;
                    $.post('/api/web/todo',{
                        content: that.input.value
                    },(data,status)=>{
                        store.dispatch({
                            type: 'ADD_TODO',
                            content: that.input.value,
                            id: data.todo._id
                        });
                        that.input.value = '';
                    });

                    e.preventDefault();
                }}
            >
                <div className="ui icon input massive">
                    <input
                        placeholder='记录你要做的事吧～'
                        ref={node => {
                      this.input = node;
                    }}/>
                    <i className="send icon"></i>
                </div>
            </form>
        )
    }
}
class Todo extends Component {

    render() {
        const {style,todo} = this.props;
        return (
            <div>
                <div className="ui segment grid"
                     style={{...style}}
                >
                    <div className="one wide column">
                        <div className="todo toggle"
                             onClick={(e)=>{
                            $.ajax({
                                url: '/api/web/todo/',
                                type: 'PUT',
                                data: {
                                    _id: todo.id,
                                    tag_finish: !todo.tag_finish
                                },
                                success: function(result){
                                    console.log(result);
                                    if (result.success) {
                                        store.dispatch({
                                            type: 'TOGGLE_TODO',
                                            id: todo.id
                                        });
                                    }
                                }
                            });
                        }}
                        >
                            <i className={todo.tag_finish?"toggle on icon":"toggle off icon"}></i>
                        </div>
                    </div>
                    <div className="twelve wide column">
                        <h3 className="todo content">
                            {todo.content}
                        </h3>
                    </div>
                    <div className="one wide column">
                        <button className="ui compact icon button negative"
                                onClick={(e)=>{
                            $.ajax({
                                url: '/api/web/todo/',
                                type: 'DELETE',
                                data: {
                                    _id: todo.id
                                },
                                success: function(result){
                                    console.log(result);
                                    if (result.success) {

                                        store.dispatch({
                                          type: 'DEL_TODO',
                                          id: todo.id
                                        });
                                    }
                                }

                            });
                            e.preventDefault();
                        }}
                        >
                            <i className="trash icon"></i>
                        </button>

                    </div>

                </div>
            </div>
        )

    }
}
;
class TodoApp extends Component {
    // actual animation-related logic
    getDefaultStyles() {
        return this.props.todos.map(todo => ({key: todo.id, data: todo, style: {height: 0, opacity: 1}}));
    }
    getStyles() {
        return this.props.todos.map((todo,i) => {
            console.log(i);
            return {
                key: todo.id,
                data: todo,
                style: {
                    height: spring(60, presets.gentle),
                    opacity: spring(1, presets.gentle)
                }
            }
        });
    }
    willEnter() {
        return {
            height: 0,
            opacity: 1,
        };
    }
    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0),
        };
    }
    render() {
        return (
            <div>
                <TodoInput />
                <div>
                    <TransitionMotion
                        defaultStyles={this.getDefaultStyles()}
                        styles={this.getStyles()}
                        willLeave={this.willLeave}
                        willEnter={this.willEnter}
                    >
                        {styles =>
                            <div>
                            {
                                styles.map(({key,data,style})=>

                                        <Todo key={key} style={style} todo={data} />

                                )
                            }
                            </div>
                        }
                    </TransitionMotion>
                </div>

            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp
            todos={store.getState()}
        />,
        document.getElementById('app')
    );
}

store.subscribe(render);
render();

$(document).ready(()=> {
    $.get('/api/web/todo_list', (data, status)=> {
        if (data.success) {
            var todos = data.todos;
            todos.forEach((t)=> {
                store.dispatch({
                    type: 'ADD_TODO',
                    content: t.content,
                    id: t._id,
                    tag_finish: t.tag_finish
                });
            });

        }
    });
});
