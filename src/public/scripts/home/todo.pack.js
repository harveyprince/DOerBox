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
        ...state,
        todo(undefined, action)
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
      <div>
        <button onClick={()=>{
          store.dispatch({
            type: 'ADD_TODO',
            content: 'Test',
            id: next_id ++
          });
        }}>
        add todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.content}
            </li>
          )}
        </ul>
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
