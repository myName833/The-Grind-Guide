"use client"

import { useState, useEffect, useCallback } from "react"
import { PlusCircle } from 'lucide-react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import TodoItem from "./TodoItem"
import MotivationalQuote from "./MotivationalQuote"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [recentAssignments, setRecentAssignments] = useState([])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    const storedRecentAssignments = localStorage.getItem("recentAssignments")

    if (storedTodos) setTodos(JSON.parse(storedTodos))
    if (storedRecentAssignments) setRecentAssignments(JSON.parse(storedRecentAssignments))
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("recentAssignments", JSON.stringify(recentAssignments))
  }, [todos, recentAssignments])

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => [
        { id: Date.now().toString(), text: newTodo, completed: false },
        ...prevTodos.filter(todo => !todo.completed),
        ...prevTodos.filter(todo => todo.completed)
      ])
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
      return [
        ...updatedTodos.filter(todo => !todo.completed),
        ...updatedTodos.filter(todo => todo.completed)
      ]
    })
  }, [])

  const editTodo = useCallback((id, newText) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)
        return [
          ...newItems.filter(todo => !todo.completed),
          ...newItems.filter(todo => todo.completed)
        ]
      })
    }
  }

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
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={todos}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-4">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
        <p className="mt-6 text-sm text-teal-600">
          {remainingTodos} task{remainingTodos !== 1 ? "s" : ""} remaining
        </p>
      </div>
      <MotivationalQuote />
    </div>
  )
}

export default TodoList
