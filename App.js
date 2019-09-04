import React, { useState, useEffect } from 'react';
import './App.css';
import Addtodo from "./component/Addtodo";
import Todo from "./component/Todos";
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

const App = () => {
  const [todos, setTodos] = useState([]);
  const [visible, setVisible] = useState(false);

  //fetch API data
  const getData = () => {
    axios
    .get("https://killsanghyuck.github.io/prography_5th_front/todoDummy.json")
    .then((response) => response.json())
    .then((data) => {
      data.body.forEach((obj) => {
        setTodos((prevState) => {
          return [...prevstate, {title: obj.title, status: obj.status}]
        });
      })
    });
  };
  useEffect(() => {
    getData();
  }, []);

  //Adding todo list
  const addTodo = text => {
    const newTodos = [...todos, {
      title,
      id: uuid.v4(),
      status: "todo"
    }];
    setTodos(newTodos);
  };

  //removing todo list
  const removeTodo = id => {
    const newTodos = [...todos];
    newTodos.splice(id, 1);
    setTodos(newTodos);
  };

  //completing todo list
  const completeTodo = id => {
    const newTodos = [...todos];
    newTodos[id].status = "complete";
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="container">
        <React.Fragment>
        <Addtodo addTodo={addTodo} />
          <div className="todoListDIv">
            <Todos
              todos={state.todos}
              markComplete={markComplete}
              delTodo={delTodo}
            />
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default App;