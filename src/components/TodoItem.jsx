"use client"

import { useState, useCallback } from "react"
import { Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import Timer from "./Timer"

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    onEdit(todo.id, editText)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleComplete = useCallback(() => {
    onToggle(todo.id)
  }, [onToggle, todo.id])

  return (
    <li className="flex items-center space-x-2 py-2 bg-white rounded-lg shadow-sm p-4">
      <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} id={`todo-${todo.id}`} />
      {isEditing ? (
        <>
          <Input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-grow" />
          <Button size="icon" onClick={handleEdit} className="bg-teal-500 hover:bg-teal-600">
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={handleCancel}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-grow ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}
          >
            {todo.text}
          </label>
          <Timer onComplete={handleComplete} />
          <Button
            size="icon"
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="border-teal-500 text-teal-500 hover:bg-teal-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => onDelete(todo.id)}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </li>
  )
}

export default TodoItem

