import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

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
      <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)}></input>
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

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      (async function() {
          setIsLoading(true);
          try {
              const response = await axios('https://killsanghyuck.github.io/prography_5th_front/todoDummy.json')
              setTodos(response.data);
          } catch (e) {
              console.error(e);
          }
          setIsLoading(false);
      })();
  }, []);

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
      <div className="todo-list">
        {todos.map((todo, id) => (
          <Todo
            key={id}
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
