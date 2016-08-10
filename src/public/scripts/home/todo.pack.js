'use strict';
import { createStore } from 'Redux';
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
          store.dispatch({
            type: 'ADD_TODO',
            content: this.input.value,
            id: next_id ++
          });
          this.input.value = '';
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
