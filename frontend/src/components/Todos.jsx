/* eslint-disable react/prop-types */
export default function Todos({ todos, completeTodo }) {
  return (
    <>
      {todos.map((todo) => (
        <li key={todo.id} style={styles.todoItem}>
          <div style={styles.todoHeader}>
            <h3 style={styles.todoTitle}>{todo.title}</h3>
            <span style={styles.status} onClick={() => completeTodo(todo.id)}>
              {todo.completed ? '🟢' : '🔴'}
            </span>
          </div>
          <p style={styles.todoDescription}>{todo.description}</p>
        </li>
      ))}
    </>
  );
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
