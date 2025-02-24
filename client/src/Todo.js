import React, { Fragment, useEffect, useState } from 'react'

const Todo = () => {

    const [title, setTitle] = useState('') ;
    const [description, setDescription] = useState('');
    const [editTitle, setEditTitle] = useState('') ;
    const [editDescription, setEditDescription] = useState('');
    const [todos, setToDos] = useState([]);  
    const [error, setError] = useState([]);  
    const [successMessage, setSuccessMessage] = useState('');  
    const [editId, setEditId] = useState(-1);  
    const apiUrl = "http://localhost:8000";

    const handleAddTaskBtn = async () => {
      setError("");
      if(title.trim() !== "" &&  description.trim() !== ""){
        
        await fetch(apiUrl+"/todos",{
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({title, description})
        }).then((res) => {
          if(res.ok){
            setToDos([...todos, {title, description}]);
            setTitle("");
            setDescription("");
            setSuccessMessage("Task added successfully");
            setTimeout(() => {
              setSuccessMessage("");
            },2000);
          }
          else{
            setError("Error in adding task!!!");
          }
        })
        .catch(() => {
          setError("Error in adding task!!!");
        })
      }
    }

    useEffect(() => {
      getAllTasks();
    }, [])

    const getAllTasks = () => {
      fetch(apiUrl+"/todos")
      .then((res) => res.json())
      .then((res) => {
        setToDos(res);
      })
    }

    const handleEdit = (todo) => {
      setEditId(todo._id);
      setEditTitle(todo.title);
      setEditDescription(todo.description);
    }

    const handleUpdate =  () => {
      setError("");
      if(editTitle.trim() !== "" &&  editDescription.trim() !== ""){
        
         fetch(apiUrl+"/todos/"+editId,{
          method: "PUT",
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({title: editTitle, description: editDescription})
        }).then((res) => {
          if(res.ok){
            const updatedTodos = todos.map(todo => 
              todo._id === editId 
                ? {...todo, title: editTitle, description: editDescription}
                : todo
            );
            setToDos(updatedTodos);
            setSuccessMessage("Task updated successfully");
            setTimeout(() => {
              setSuccessMessage("");
            },2000)
            setEditId(-1);
          }
          else{
            setError("Error in adding task!!!");
          }
        })
        .catch(() => {
          setError("Error in adding task!!!");
        })
      }
    }

    const handleEditCancel = () => {
      setEditId(-1);
    }

    const handleDelete = (id) => {
      if(window.confirm("Are you sure you want to delete this task?")){
        fetch(apiUrl+"/todos/"+id,{
          method: "DELETE"
        })
        .then(() => {
          const updatedTodos = todos.filter((todo) => todo._id !== id);
          setToDos(updatedTodos);
          setSuccessMessage("Task deleted successfully!!");
          setTimeout(() => {
            setSuccessMessage("");
          },2000)
         
        })
    }}

  return (
    <Fragment>
      <div className='text-center font-montserrat p-4 text-semibold text-3xl bg-green-500 text-white '>
        <h1>Todo project with MERN Stack</h1>
      </div>
      <div className='max-container'>
        <h2 className='font-montserrat text-xl  m-4  font-semibold'>Add Item</h2>
        { successMessage && <p className='font-palanquin text-green-500 m-4'>{successMessage}</p>}
        <div className='max-container w-full flex justify-between mt-6 gap-10'>
          <input 
          type='text' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          className='outline-blue-300 px-4 border border-black rounded-md w-full'
          />
          <input 
          type='text' 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description' 
          className='outline-blue-300 border px-4 border-black rounded-md w-full' 
          />
          <button 
          className='bg-black hover:bg-gray-800 text-white w-[20%] py-2 rounded-md transition-all duration-300 font-montserrat text-base font-medium'
          onClick={handleAddTaskBtn}
          >
            Add task
          </button>
        </div>
        {error && <p className='max-container mt-4 text-coral-red'>{error}</p>}
        
      </div>

      <div className='max-container mt-6'>
        <h2 className='font-montserrat text-xl mb-6'>Tasks</h2>
       {todos.map((todo, index) => 
          <div key={index} className='flex justify-between items-center bg-gray-100 p-4 mb-4'>
          <div className='flex flex-col gap'>
            {
              editId == -1 || editId !== todo._id ? <>
                  <span className='font-montserrat font-semibold'>{todo.title}</span>
                  <span className='font-montserrat mt-4'>{todo.description}</span>
              </> :
              <>
                   <div className='max-container w-full flex justify-center items-center   gap-10'>
                      <input 
                      type='text' 
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder='Title'
                      className='outline-blue-300 px-4 py-2 border border-black rounded-md w-full'
                      />
                      <textarea 
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder='Description' 
                      className='outline-blue-300 border px-4 py-2 border-black rounded-md w-full' 
                      />
                    </div>

              </>
            }
          </div>
          <div className='flex gap-4 justify-between'>
            {
              editId == -1 || editId !== todo._id ? 
              <button 
              className='bg-yellow-300 px-6 py-2 rounded-md ' 
              onClick={() => handleEdit(todo)}
              >
              Edit
              </button> :
              <button 
              className='bg-green-500 px-6 py-2 rounded-md'
              onClick={handleUpdate}
              >
              Update
              </button>
            }
            
            {
              editId == -1 ? <button className='bg-coral-red px-6 py-2 rounded-md' onClick={() => handleDelete(todo._id)}>Delete</button> :
              <button className='bg-coral-red px-6 py-2 rounded-md' onClick={handleEditCancel}>Cancel</button>
            }
            
          </div>
        </div>
       )}
      </div>

    </Fragment>
  )
}

export default Todo