'use strict';
import { createStore, combineReducers } from 'redux';
import React,{ Component } from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import TweenMax from 'gsap';
import ReactTransitionGroup from 'react-addons-transition-group';
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
const filter = (state = {}, action) => {
    switch (action.type) {
        case 'SEARCH_KEY':
            return {
                ...state,
                search_key: action.content
            };
        case 'TAG_KEY':
            return {
                ...state,
                finish_key: action.content
            };
        default:
            return state;
    }
}
const todoApp = combineReducers({
    todos,
    filter
});
const store = createStore(todoApp);
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
                        store.dispatch({
                            type: 'SEARCH_KEY',
                            content: ''
                        });
                    });

                    e.preventDefault();
                }}
            >
                <div className="ui icon input massive todo">

                    <i className="icon settings left todo circular cursor"
                        onClick={(e)=>{
                            console.log('clicked');
                        }}
                    ></i>

                    <div className="todo toggle-box">
                        <i className="toggle on icon"></i>
                    </div>

                    <input
                        placeholder='记录你要做的事吧～'
                        ref={node => {
                          this.input = node;
                        }}
                        onChange = {(e)=>{
                            var key = this.input.value;

                            store.dispatch({
                                type: 'SEARCH_KEY',
                                content: key
                            });


                        }}
                    />
                    <i className="send icon"></i>
                </div>
            </form>
        )
    }
}
class Todo extends Component {

    componentWillEnter(callback) {
        const el = findDOMNode(this);
        TweenMax.from(el, 0.3, {y: -100, opacity: 0, height: 0, onComplete: callback});
    }

    componentWillLeave(callback) {
        const el = findDOMNode(this);
        TweenMax.to(el, 0.3, {height:0, y: -100, opacity: 0, onComplete: callback});
    }

    render() {
        let todo = this.props.todo;
        let that = this;
        return (
            <div id={"item-"+todo.id} key={todo.id}>
                <div className="ui segment grid todo">
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
    render() {
        const {todos, filter} = this.props.todoApp;
        return (
            <div>
                <TodoInput />
                <div>
                    <ReactTransitionGroup component='div'>
                    {todos.filter((item)=>{
                        if (filter.search_key && filter.search_key != '') {
                            return item.content.indexOf(filter.search_key)>=0;
                        }
                        return true;
                    }).map(todo =>
                        <Todo todo={todo} key={todo.id} />
                    )}
                    </ReactTransitionGroup>
                </div>
            </div>
        )
    }
}

const render = () => {
    ReactDOM.render(
        <TodoApp
            todoApp={store.getState()}
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
