import type React from "react"

import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { todoListState } from "../recoil/atoms"
import { formatDate, capitalizeFirstLetter } from "../utils/helpers"
import { Pencil, Trash2, Check, X, Calendar, Clock, AlertTriangle } from "lucide-react"
import type { Todo } from "../types/todo"
import { ErrorDialog } from "./error-dialog"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const setTodoList = useSetRecoilState(todoListState)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDate, setEditDate] = useState(todo.date)
  const [editTime, setEditTime] = useState(todo.time)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [titleError, setTitleError] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const today = new Date().toISOString().split("T")[0]
  const validateTitle = (value: string): boolean => {
    if (value.length < 3) {
      setTitleError("Title must be at least 3 characters")
      return false
    }
    if (value.length > 25) {
      setTitleError("Title must be less than 25 characters")
      return false
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
      setTitleError("Title can only contain letters, numbers and spaces")
      return false
    }
    setTitleError("")
    return true
  }

  const toggleTodoCompletion = () => {
    setTodoList((oldTodoList) =>
      oldTodoList.map((item) => (item.id === todo.id ? { ...item, completed: !item.completed } : item)),
    )
  }

  const deleteTodo = () => {
    setTodoList((oldTodoList) => oldTodoList.filter((item) => item.id !== todo.id))
    setShowDeleteConfirm(false)
  }

  const startEditing = () => {
    setEditTitle(todo.title)
    setEditDate(todo.date)
    setEditTime(todo.time)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setTitleError("")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEditTitle(value)
    if (value) validateTitle(value)
  }

  const saveEdit = () => {
    if (!editTitle.trim() || !validateTitle(editTitle)) return

    let isDuplicate = false

    setTodoList((oldTodoList) => {
      isDuplicate = oldTodoList.some(
        (item) =>
          item.id !== todo.id &&
          item.title.toLowerCase() === editTitle.trim().toLowerCase() &&
          item.date === editDate &&
          item.time === editTime,
      )

      if (isDuplicate) {
        setErrorMessage("A todo with the same title, date and time already exists!")
        setShowErrorDialog(true)
        return oldTodoList
      }

      if (!isDuplicate) {
        setIsEditing(false)
        setTitleError("")
      }

      return oldTodoList.map((item) =>
        item.id === todo.id
          ? { ...item, title: capitalizeFirstLetter(editTitle.trim()), date: editDate, time: editTime }
          : item,
      )
    })
  }

  const isEditFormValid = editTitle.trim() && !titleError && editDate && editTime

  return (
    <>
      <li className="py-4 animate-fadeIn">
        {isEditing ? (
          <div className="space-y-3 p-3 border border-slate-200 rounded-lg bg-white shadow-sm">
            <input
              type="text"
              value={editTitle}
              onChange={handleTitleChange}
              className={`w-full px-3 py-2 border ${
                titleError ? "border-red-500" : "border-slate-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              autoFocus
            />
            {titleError && <p className="mt-1 text-sm text-red-500">{titleError}</p>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`edit-date-${todo.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id={`edit-date-${todo.id}`}
                  value={editDate}
                  min={today}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <label htmlFor={`edit-time-${todo.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  id={`edit-time-${todo.id}`}
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={saveEdit}
                className={`btn ${
                  isEditFormValid ? "btn-primary" : "bg-blue-300 cursor-not-allowed"
                } flex items-center transition-all duration-300 transform hover:scale-105 text-sm`}
                disabled={!isEditFormValid}
              >
                <Check className="w-4 h-4 mr-1" /> Save
              </button>
              <button
                onClick={cancelEditing}
                className="btn btn-secondary flex items-center transition-all duration-300 transform hover:scale-105 text-sm"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          </div>
        ) : showDeleteConfirm ? (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 animate-pulse">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <h4 className="text-red-700 font-medium">Confirm deletion</h4>
            </div>
            <p className="text-red-600 mb-3">Are you sure you want to delete this todo?</p>
            <div className="flex space-x-2">
              <button
                onClick={deleteTodo}
                className="btn btn-danger flex items-center transition-all duration-300 transform hover:scale-105 text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-secondary flex items-center transition-all duration-300 transform hover:scale-105 text-sm"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={toggleTodoCompletion}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-blue-500 focus:ring-blue-500"
              />

              <div>
                <h3
                  className={`text-base sm:text-lg font-medium ${todo.completed ? "line-through text-slate-500" : "text-slate-900"}`}
                >
                  {todo.title}
                </h3>

                {(todo.date || todo.time) && (
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    {todo.date && (
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{formatDate(todo.date)}</span>
                      </div>
                    )}

                    {todo.time && (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{todo.time}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={startEditing}
                className="p-1.5 text-slate-500 hover:text-blue-500 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Edit todo"
              >
                <Pencil className="h-5 w-5" />
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-1.5 text-slate-500 hover:text-red-500 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Delete todo"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </li>

      <ErrorDialog message={errorMessage} isOpen={showErrorDialog} onClose={() => setShowErrorDialog(false)} />
    </>
  )
}
