import React, { Fragment, useState } from 'react'

const Todo = () => {

    const [title, setTitle] = useState('') ;
    const [description, setDescription] = useState('');
    const [todos, setToDos] = useState([]);  
    const [error, setError] = useState([]);  
    const [successMessage, setSuccessMessage] = useState('');  
    const apiUrl = "http://localhost:8000";

    const handleAddTaskBtn = () => {
      if(title.trim() !== "" &&  description.trim() !== ""){
        
        fetch(apiUrl+"/todos",{
          method: "POST",
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({title, description})
        }).then((res) => {
          if(res.ok){
            setToDos([...todos, {title, description}]);
            setSuccessMessage("Task added successfully");
          }
          else{
            setError("Error in adding task!!!");
          }
        })
      }
    }

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
    </Fragment>
  )
}

export default Todo