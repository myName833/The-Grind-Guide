"use client"

import { useState, useEffect, useCallback } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import TodoItem from "./TodoItem"
import MotivationalQuote from "./MotivationalQuote"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  //const [completedAssignments, setCompletedAssignments] = useState([])
  const [recentAssignments, setRecentAssignments] = useState([])

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    //const storedCompletedAssignments = localStorage.getItem("completedAssignments")
    const storedRecentAssignments = localStorage.getItem("recentAssignments")

    if (storedTodos) setTodos(JSON.parse(storedTodos))
    //if (storedCompletedAssignments) setCompletedAssignments(JSON.parse(storedCompletedAssignments))
    if (storedRecentAssignments) setRecentAssignments(JSON.parse(storedRecentAssignments))
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    //localStorage.setItem("completedAssignments", JSON.stringify(completedAssignments))
    localStorage.setItem("recentAssignments", JSON.stringify(recentAssignments))
  }, [todos, recentAssignments])

  // useEffect(() => {
  //   const today = new Date()
  //   today.setHours(0, 0, 0, 0)
  //   const completedToday = todos.filter((todo) => todo.completed).length

  //   setCompletedAssignments((prev) => {
  //     const existingEntry = prev.find((entry) => new Date(entry.date).getTime() === today.getTime())
  //     if (existingEntry) {
  //       return prev.map((entry) =>
  //         new Date(entry.date).getTime() === today.getTime() ? { ...entry, count: completedToday } : entry,
  //       )
  //     } else {
  //       return [...prev, { date: today.toISOString(), count: completedToday }]
  //     }
  //   })
  // }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => [...prevTodos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, completed: !todo.completed }
          if (updatedTodo.completed) {
            setRecentAssignments((prev) => [
              { text: updatedTodo.text, completedDate: new Date().toISOString() },
              ...prev.slice(0, 4),
            ])
          }
          return updatedTodo
        }
        return todo
      })
      return updatedTodos
    })
  }, [])

  const editTodo = useCallback((id, newText) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const remainingTodos = todos.filter((todo) => !todo.completed).length

  return (
    <div className="space-y-8">
      <div className="bg-teal-50 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-800">The Grind Guide</h1>
        <form onSubmit={addTodo} className="flex mb-6 space-x-2">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow bg-white"
          />
          <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
            <PlusCircle className="h-5 w-5 mr-1" />
            Add
          </Button>
        </form>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onEdit={editTodo} onDelete={deleteTodo} />
          ))}
        </ul>
        <p className="mt-6 text-sm text-teal-600">
          {remainingTodos} task{remainingTodos !== 1 ? "s" : ""} remaining
        </p>
      </div>
      <MotivationalQuote />
      {/* <AttendanceTracker completedAssignments={completedAssignments} /> */}
    </div>
  )
}

export default TodoList

