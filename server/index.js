const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());
  
mongoose.connect('mongodb://localhost:27017/mernstack')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.log('Failed to connect to MongoDB', err);
})

// creating a schema

const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: String
})

// creating a model

const todoModel = mongoose.model('Todo', todoSchema);

app.post('/todos', async(req, res) => {    // Create a new todo API
  const  {title, description} = req.body;
  /*const newTodo = {
    id: todos.length + 1,
    title,
    description
  };
  todos.push(newTodo);
  console.log(todos);*/
  
 try {
  const newTodo = new todoModel({title, description});
  await newTodo.save();
  res.status(201).json(newTodo);
  
 } catch (error) {
  console.log(error);
  res.status(500).json({message: error.message});
 }
  
})

app.get('/todos', async (req, res) => {    // Get all todos API
  
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}) 

// to update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const  {title, description} = req.body; 
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(id, {title, description},{new: true});
    if(!updatedTodo) {
      res.status(404).json({message: 'Todo not found'});
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
    
  }
})

// to delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req. params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
    
  }
})

port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})