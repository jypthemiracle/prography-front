import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import uuid from "uuid";

function Todo({todo, id, completeTodo, removeTodo}) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.status ? "line-through" : ""}}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(id)}>Complete</button>
        <button onClick={() => removeTodo(id)}>x</button>
      </div>
    </div>
  )
}

function TodoForm({addTodo}){
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App(){
  const [state, setState] = useState({
    todos:[]
  });

  //fetch API data
  const getData = async (item) => {
    const response = await
      axios.get("https://killsanghyuck.github.io/prography_5th_front/todoDummy.json")
    setState({todos:res.data.body}));
  }
  useEffect(() => {
    getData(item);
  }, [item]);

  //Adding todo list
  const addTodo = title => {
    const newTodos = [...state, {
      title,
      id: uuid.v4(),
      status: "todo"
    }];
    setState(newTodos);
  };

  //removing todo list
  const removeTodo = id => {
    const newTodos = [...state];
    newTodos.splice(id, 1);
    setState(newTodos);
  };

  //completing todo list
  const completeTodo = id => {
    const newTodos = [...state];
    newTodos[id].status = "complete";
    setState(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {state.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
export default App;