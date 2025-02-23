const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
  
mongoose.connect('mongodb://localhost:27017/mernstack')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log('Failed to connect to MongoDB', err);
})

// creating a schema

const todoSchema = new mongoose.Schema({
  title: String,
  description: String
})

// creating a model

const todoModel = mongoose.model('Todo', todoSchema);

app.post('/todos', (req, res) => {    // Create a new todo API
  const  {title, description} = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    description
  };
  todos.push(newTodo);
  console.log(todos);
  res.status(201).json(newTodo);
  
})

app.get('/todos', (req, res) => {    // Get all todos API
  res.json(todos);
}) 

port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})