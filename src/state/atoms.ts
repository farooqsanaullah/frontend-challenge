import { atom, selector } from 'recoil';

export interface TodoItem {
  text: string;
  completed: boolean;
}

export const todoListState = atom<TodoItem[]>({
  key: 'todoListState',
  default: [],
});

// Renamed selector to a more meaningful name
export const todoStatisticsState = selector({
  key: 'todoStatisticsState',
  get: ({ get }) => {
    const list = get(todoListState);
    const total = list.length;
    const completed = list.filter(item => item.completed).length;
    return { total, completed };
  },
});
