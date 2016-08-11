'use strict';
import { createStore } from 'redux';
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        content: action.content,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
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
      return state.map( (t) =>
        todo(t, action)
      )
    default:
      return state;
  }
}

const store = createStore(todos);
let next_id = 0;
class TodoApp extends Component {
  render(){
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
            }} />
          <i className="send icon"></i>
        </div>
          {this.props.todos.map(todo =>
            <div className="ui segment" key={todo.id}>
              <h3>
                {todo.content}
              </h3>
            </div>
          )}
      </form>
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

$(document).ready(()=>{
    $.get('/api/web/todo_list',(data,status)=>{
        if (data.success) {
            var todos = data.todos;
            todos.forEach((t)=>{
                store.dispatch({
                  type: 'ADD_TODO',
                  content: t.content,
                  id: t._id
                });
            });

        }
    });
});
