import { useState } from 'react';
import axios from 'axios';
import './App.css';

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

  const styles = {
    todoItem: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    todoHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    todoTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold',
    },
    status: {
      fontSize: '24px',
    },
    todoDescription: {
      margin: 0,
      fontSize: '14px',
      color: '#555',
    },
  };

  const todoItems = todos.map((todo) => (
    <li key={todo.id} style={styles.todoItem}>
      <div style={styles.todoHeader}>
        <h3 style={styles.todoTitle}>{todo.title}</h3>
        <span style={styles.status} onClick={()=>completeTodo(todo.id)} >{todo.completed ? '🟢' : '🔴'}</span>
      </div>
      <p style={styles.todoDescription}>{todo.description}</p>
    </li>
  ));

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
      <ul>{todoItems}</ul>
    </>
  );
}

export default App;
