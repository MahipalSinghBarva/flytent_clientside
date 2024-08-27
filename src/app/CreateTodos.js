"use client";
import { useEffect, useState, useContext } from 'react';
import { TodoContext } from './TodoContext';
import axios from 'axios';

const CreateTodos = () => {
    const { selectedTodo, handleUpdateTodo, handleRefreshTodos } = useContext(TodoContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (selectedTodo) {
            setTitle(selectedTodo.title);
            setDescription(selectedTodo.description);
        }
    }, [selectedTodo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/todos", { title, description });
            alert("Todo created successfully");
            setTitle("");
            setDescription("");
            handleRefreshTodos();
        } catch (error) {
            console.error("Error creating todo:", error);
            alert("Failed to create todo");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:8080/api/todos/${selectedTodo._id}`, { title, description });
            handleUpdateTodo({ ...selectedTodo, title, description });
            alert("Todo updated successfully");
            handleRefreshTodos();
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className='bg-white p-4 md:p-6 rounded-lg shadow-md'>
            <h1 className='text-xl md:text-2xl font-semibold mb-4 bg-black text-white w-full md:w-48 rounded-lg py-2 px-4   md:px-6'>
                {selectedTodo ? "Edit Todo" : "Create Todo"}
            </h1>
            <form onSubmit={selectedTodo ? handleUpdate : handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-lg font-medium mb-2' htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-lg font-medium mb-2' htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'>
                    {selectedTodo ? 'Update Todo' : 'Create Todo'}
                </button>
            </form>
        </div>
    );
};

export default CreateTodos;
