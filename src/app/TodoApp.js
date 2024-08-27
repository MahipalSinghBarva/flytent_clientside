"use client";
import React, { useState } from 'react';
import Todos from "./Todos";
import CreateTodos from "./CreateTodos";

const TodoApp = () => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [refresh, setRefresh] = useState(false);
    
    const handleSelectTodo = (todo) => {
        console.log("handleSelectTodo function:", handleSelectTodo);


        setSelectedTodo(todo);
    };

    const handleUpdateTodo = (updatedTodo) => {
        setSelectedTodo(updatedTodo);
    };

    const handleRefreshTodos = () => {
        setRefresh(!refresh);  
    };

    return (
        <div className="flex h-screen">
            <Todos onSelectTodo={handleSelectTodo} refresh={refresh} />
            <CreateTodos selectedTodo={selectedTodo} onUpdateTodo={handleUpdateTodo} onRefreshTodos={handleRefreshTodos} />
        </div>
    );
};

export default TodoApp;
