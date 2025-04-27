import { TodoForm } from "./todo-form"
import { TodoList } from "./todo-list"
import { TodoFilter } from "./todo-filter"
import { TodoStats } from "./todo-stats"

export function TodoContainer() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TodoForm />
      <TodoFilter />
      <TodoStats />
      <TodoList />
    </div>
  )
}