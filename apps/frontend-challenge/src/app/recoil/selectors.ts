import { selector } from "recoil"
import { todoListState, todoFilterState, searchQueryState, itemsPerPageState } from "./atoms"
import type { Todo } from "../types/todo"

export const filteredTodoListState = selector<Todo[]>({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoFilterState)
    const list = get(todoListState)
    const searchQuery = get(searchQueryState).toLowerCase()

    // First filter by the selected filter type
    let filteredList = list

    switch (filter) {
      case "active":
        filteredList = list.filter((item) => !item.completed)
        break
      case "completed":
        filteredList = list.filter((item) => item.completed)
        break
      case "today": {
        const today = new Date().toISOString().split("T")[0]
        filteredList = list.filter((item) => item.date === today)
        break
      }
      default:
        filteredList = list
    }

    // Then filter by search query if present
    if (searchQuery) {
      filteredList = filteredList.filter((item) => item.title.toLowerCase().includes(searchQuery))
    }

    return filteredList
  },
})

export const todoStatsState = selector({
  key: "todoStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState)
    const total = todoList.length
    const completed = todoList.filter((item) => item.completed).length

    return {
      total,
      completed,
    }
  },
})

export const totalPagesSelector = selector<number>({
  key: "totalPagesSelector",
  get: ({ get }) => {
    const filteredTodos = get(filteredTodoListState)
    const itemsPerPage = get(itemsPerPageState)

    if (itemsPerPage === Number.POSITIVE_INFINITY) return 1
    return Math.ceil(filteredTodos.length / itemsPerPage)
  },
})
