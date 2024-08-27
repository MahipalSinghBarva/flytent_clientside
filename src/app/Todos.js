"use client";
import React, { useEffect, useState, useContext } from 'react';
import { TodoContext } from './TodoContext';
import axios from 'axios';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTodos, setTotalTodos] = useState(0);
    const [todosPerPage] = useState(5); 
    const { handleSelectTodo, refresh } = useContext(TodoContext);

    const getTodos = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/todos?page=${page}&limit=${todosPerPage}`);
            setTodos(response.data.todos);
            setTotalTodos(response.data.total); 
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    useEffect(() => {
        getTodos(currentPage); 
    }, [refresh, currentPage]);

    const totalPages = Math.ceil(totalTodos / todosPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${todoId}`);
            alert("Todo deleted successfully!");
            getTodos(currentPage); 
        } catch (error) {
            console.error("Error deleting todo:", error);
            alert("Failed to delete todo.");
        }
    };

    return (
        <div className="px-4 py-5 md:px-28 md:py-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="py-2 px-4 w-20 rounded-lg bg-black text-white text-center">Todos</h2>
                <img
                    className="w-12 h-8 bg-white rounded-lg shadow-md"
                    src="https://www.clipartmax.com/png/middle/202-2020073_find-out-the-network-of-online-auctions-search-bar-icon-png.png"
                    alt="Search Icon"
                />
            </div>

            <ul className="space-y-4">
                {todos.map((todo) => (
                    <li
                        key={todo._id}
                        onClick={() => handleSelectTodo(todo)}
                        className="border rounded-lg shadow-md bg-white p-4 cursor-pointer hover:shadow-lg transition-shadow"
                    >
                        <div className='bg-transparent'>
                            <div className='flex justify-between'>
                                <p className="font-semibold bg-transparent text-lg mb-2">{todo.title}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        handleDeleteTodo(todo._id);
                                    }}
                                >
                                    <img className='w-8 h-8' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdzBjGYRY2IO5GEVvf03MUD5N05hsuaC1eg&s' />
                                </button>
                            </div>
                            <div className='flex justify-between'>
                                <p className="text-gray-600 bg-transparent">{todo.description}</p>
                                <p className="text-green-800 bg-transparent text-sm mt-2">{new Date(todo.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex justify-center space-x-2">
                <button
                    className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page}
                        className={`px-3 py-1 border rounded ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Todos;
