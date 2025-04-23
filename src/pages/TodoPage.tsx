import React from 'react';
import { TodoList } from '../components/TodoList';

export const TodoPage: React.FC = () => (
  <div className="min-h-screen max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
    <TodoList />
  </div>
);