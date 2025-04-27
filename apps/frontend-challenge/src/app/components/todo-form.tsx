import type React from "react"

import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { todoListState } from "../recoil/atoms"
import { generateId, getCurrentTime, capitalizeFirstLetter } from "../utils/helpers"
import type { Todo } from "../types/todo"
import { ErrorDialog } from "./error-dialog"

export function TodoForm() {
  const setTodoList = useSetRecoilState(todoListState)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState(getCurrentTime())
  const [titleError, setTitleError] = useState("")
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const today = new Date().toISOString().split("T")[0]
  const validateTitle = (value: string): boolean => {
    if (value.length < 3) {
      setTitleError("Title must be at least 3 characters")
      return false
    }
    if (value.length > 50) {
      setTitleError("Title must be less than 50 characters")
      return false
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
      setTitleError("Title can only contain letters, numbers and spaces")
      return false
    }
    setTitleError("")
    return true
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    if (value) validateTitle(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !validateTitle(title)) return

    let isDuplicate = false

    setTodoList((oldTodoList) => {
      isDuplicate = oldTodoList.some(
        (todo) => todo.title.toLowerCase() === title.trim().toLowerCase() && todo.date === date && todo.time === time,
      )

      if (isDuplicate) {
        setErrorMessage("A todo with the same title, date and time already exists!")
        setShowErrorDialog(true)
        return oldTodoList
      }

      const newTodo: Todo = {
        id: generateId(),
        title: capitalizeFirstLetter(title.trim()),
        date,
        time,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      setTitle("")
      setDate("")
      setTime(getCurrentTime())

      return [...oldTodoList, newTodo]
    })
  }

  const isFormValid = title.trim() && !titleError && date && time

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className={`w-full px-3 py-2 border ${
                titleError ? "border-red-500" : "border-slate-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter todo title"
              required
            />
            {titleError && <p className="mt-1 text-sm text-red-500">{titleError}</p>}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`mt-4 btn ${
            isFormValid ? "btn-primary" : "bg-blue-300 cursor-not-allowed"
          } transition-all duration-300 transform hover:scale-105 text-sm`}
          disabled={!isFormValid}
        >
          Add Todo
        </button>
      </form>

      <ErrorDialog message={errorMessage} isOpen={showErrorDialog} onClose={() => setShowErrorDialog(false)} />
    </>
  )
}
