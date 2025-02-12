"use client"

import { useState, useCallback } from "react"
import { Pencil, Trash2, Check, X, GripVertical } from "lucide-react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Checkbox } from "../components/ui/checkbox"
import Timer from "./Timer"

const TodoItem = ({ id, todo, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
    <li ref={setNodeRef} style={style} {...attributes} className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 py-2 p-4">
        <button className="cursor-move" {...listeners}>
          <GripVertical className="h-5 w-5 text-gray-400" />
        </button>
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
      </div>
    </li>
  )
}

export default TodoItem

