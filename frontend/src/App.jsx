import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'cake', description: 'eat some cake' },
  ]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  async function showTodos() {
    const response = await axios.get('http://localhost:3000/todos');

    setTodos(response.data);
  }

  async function addTodo() {
    if (todoTitle === '' || todoDescription === '') {
      return;
    }

    const todoPayload = {
      title: todoTitle,
      description: todoDescription,
    };

    setTodoTitle('');
    setTodoDescription('');

    axios
      .post('http://localhost:3000/todo', todoPayload)
      .then(function (response) {
        console.log(response);
        showTodos();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function completeTodo(id) {
    axios.put('http://localhost:3000/completed',{id,})
    .then((response)=>{
        console.log(response);
        showTodos();
        
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  

  return (
    <>
      <input
        name='todoTitle'
        value={todoTitle}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
        onChange={(e) => setTodoTitle(e.target.value)}
        type='text'
        placeholder='Title'
      ></input>
      <br></br>
      <input
        name='todoDescription'
        value={todoDescription}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
        onChange={(e) => setTodoDescription(e.target.value)}
        type='text'
        placeholder='description'
      ></input>
      <button onClick={addTodo}>Add Todo</button>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={showTodos}>Show Todos</button>
      <Todos todos={todos} completeTodo={completeTodo} ></Todos>
    </>
  );
}

export default App;
