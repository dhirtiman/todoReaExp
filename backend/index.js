const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const { todoZod, updateTodoZod } = require('./types');
const { Todo } = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
  const newTodo = {
    title: req.body.title,
    description: req.body.description,
  };

  const parsedTodo = todoZod.safeParse(newTodo);

  if (!parsedTodo.success) {
    return res.status(411).json({
      msg: 'you sent sum wrong input',
      error: parsedUpdatedTodo.error.message,
    });
  }
  console.log(parsedTodo);

  // put it in monogodb // done

  Todo.create({
    ...parsedTodo.data,
    completed: false,
  })
    .then((todo) => {
      return res
        .status(200)
        .json({ message: 'todo created successfully', todo });
    })
    .catch((err) => {
      return res.status(501).send(`error creating todo`);
    });
});

app.get('/todos', async (req, res) => {
  const docs = await Todo.find();

  const todos = docs.map((todo) => {
    return {
      id: todo._id,
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    };
  });

  return res.status(200).json(todos);
});

app.put('/completed', async (req, res) => {
  const updatedTodo = req.body;

  const parsedUpdatedTodo = updateTodoZod.safeParse(updatedTodo);

  if (!parsedUpdatedTodo.success) {
    return res.status(411).json({
      msg: 'you sent sum wrong input',
      error: parsedUpdatedTodo.error.message,
    });
  }

  const todo = await Todo.findOne({ _id: parsedUpdatedTodo.data.id });
  todo.completed = !todo.completed;
  const updated = await todo.save();
  console.log(updated);

  try {
    if (updated) {
      return res.status(200).json({
        msg: 'Completed changed successfully',
        updated,
      });
    }
  } catch (error) {
    return res.status(501).json({ msg: 'Error updated state', err });
  }
});

app.listen(port, () => {
  console.log('the server is running on port: ', port);
});
