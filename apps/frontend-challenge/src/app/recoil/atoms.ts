import { atom } from "recoil"
import type { Todo } from "../types/todo"

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
})

export const todoFilterState = atom<string>({
  key: "todoFilterState",
  default: "all",
})

export const searchQueryState = atom<string>({
  key: "searchQueryState",
  default: "",
})

export const currentPageState = atom<number>({
  key: "currentPageState",
  default: 1,
})

export const itemsPerPageState = atom<number>({
  key: "itemsPerPageState",
  default: 10,
})
