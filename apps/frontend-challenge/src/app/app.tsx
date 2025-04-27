import { TodoContainer } from "./components/todo-container"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">Todo List</h1>
        <TodoContainer />
      </div>
    </div>
  )
}