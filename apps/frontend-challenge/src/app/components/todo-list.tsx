import { useState, useEffect } from "react"
import { useRecoilValue } from "recoil"
import { filteredTodoListState } from "../recoil/selectors"
import { currentPageState, itemsPerPageState } from "../recoil/atoms"
import { TodoItem } from "./todo-item"
import { Pagination } from "./pagination"

export function TodoList() {
  const filteredTodos = useRecoilValue(filteredTodoListState)
  const currentPage = useRecoilValue(currentPageState)
  const itemsPerPage = useRecoilValue(itemsPerPageState)

  const indexOfLastTodo = currentPage * itemsPerPage
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo)

  const [listHeight, setListHeight] = useState("auto")
  useEffect(() => {
    if (filteredTodos.length > 5) {
      setListHeight("calc(100vh - 400px)")
    } else {
      setListHeight("auto")
    }
  }, [filteredTodos.length])

  if (filteredTodos.length === 0) {
    return <div className="text-center py-8 text-slate-500">No todos found. Add a new todo to get started!</div>
  }

  return (
    <div>
      <div
        className="divide-y divide-slate-200 overflow-y-auto transition-all duration-300"
        style={{ maxHeight: listHeight }}
      >
        <ul>
          {currentTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>

      {filteredTodos.length > 0 && itemsPerPage !== Number.POSITIVE_INFINITY && (
        <Pagination />
      )}
    </div>
  )
}
