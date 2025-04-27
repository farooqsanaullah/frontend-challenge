export interface Todo {
  id: string
  title: string
  date: string
  time: string
  completed: boolean
  createdAt: string
}

export type FilterOption = "all" | "active" | "completed" | "withDate"