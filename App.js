import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Todo = ({ todo }) => <div className="todo">{todo.title}</div>;

function TodoForm({addTodo}) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="todo">
      <input
      type="title" 
      className="input"
      value={value}
      onChange={e => setValue(e.target.value)}></input>
      </div>
    </form>
  )
}

function Todo({todo, id, completeTodo, removeTodo}) {
  return (
    <div className="todo" style={{textDecoration: todo.status? "line-through": ""}}>
      {todo.title}
      <div>
        <button onClick={() => completeTodo(id)}>Complete</button>
        <button onClick={() => removeTodo(id)}>Delete</button>
      </div>
    </div>
  )
}

function TodoListFunction() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        fetch("https://killsanghyuck.github.io/prography_5th_front/todoDummy.json")
        .then(response => response.json())
        .then(todos => {
          setTodos(todos);
          setIsLoading(false);
        });
      });

      if (loading) return <div>Loading...</div>;
      return (
        <ul>
        {todos.map(todolist => (
          <li key={todolist.id}>{todolist.title}</li>
          ))}
        </ul>
      );
    }

  const addTodo = title => {
    const newTodos = [...todos, { title }];
    setTodos(newTodos);
  };

  const completeTodo = id => {
    const newTodos = [...todos];
    newTodos[id].status = "complete";
    setTodos(newTodos);
  }

  const removeTodo = id => {
    const newTodos = [...todos];
    newTodos.splice(id, 1);
    setTodos(newTodos);
  }
  
  return (
    <div className="App">
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
      <div className="todolist">
        {todos.map((todo, id) => (
          <Todo
            index={id}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>      
      )}
    </div>
  );
}

export default App;