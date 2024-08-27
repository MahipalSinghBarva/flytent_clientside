"use client"
import React, { createContext, useState } from "react"

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [selectedTodo, setSelectedTodo] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const handleSelectTodo = (todo) => {
        setSelectedTodo(todo)
    }

    const handleUpdateTodo = (updatedTodo) => {
        setSelectedTodo(updatedTodo)
    }

    const handleRefreshTodos = () => {
        setRefresh(!refresh)
    }

    return (
        <TodoContext.Provider
            value={{ selectedTodo, handleSelectTodo, handleRefreshTodos, handleUpdateTodo, refresh }}
        >
            {children}
        </TodoContext.Provider>
    )
}