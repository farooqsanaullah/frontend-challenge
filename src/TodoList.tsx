import React, { useState, KeyboardEvent } from 'react';
import { PlusIcon, CheckIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface TodoItem {
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState<string>('');
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const totalCount = items.length;
  const completedCount = items.filter(item => item.completed)?.length;

  const trimmedNew = newItem.trim();
  const isAddEnabled = trimmedNew.length >= 3 && trimmedNew.length <= 25;
  const validationError = trimmedNew.length > 0 && !isAddEnabled
    ? trimmedNew.length < 3
      ? 'Minimum 3 characters required.'
      : 'Maximum 25 characters allowed.'
    : '';

  const handleAddItem = () => {
    if (!isAddEnabled) return;
    const formatted = trimmedNew.charAt(0).toUpperCase() + trimmedNew.slice(1);
    setItems(prev => [...prev, { text: formatted, completed: false }]);
    setNewItem('');
    setEditingIndex(null);
    setEditingText('');
  };

  const toggleComplete = (index: number) => {
    setItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
    if (editingIndex === index) setEditingIndex(null);
  };

  const confirmDelete = (index: number) => setPendingDelete(index);
  const handleConfirmDelete = () => {
    if (pendingDelete !== null) {
      setItems(prev => prev.filter((_, i) => i !== pendingDelete));
      setPendingDelete(null);
    }
  };
  const handleCancelDelete = () => setPendingDelete(null);

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditingText(items[index].text);
  };
  const saveEdit = (index: number) => {
    const trimmed = editingText.trim();
    if (trimmed.length < 1) return;
    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    setItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, text: formatted } : item))
    );
    setEditingIndex(null);
  };
  const cancelEdit = () => setEditingIndex(null);
  const handleEditKey = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') saveEdit(index);
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="relative max-w-xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">Todo List</h1>
        <div className="flex space-x-2">
          <span className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm">
            Total: {totalCount}
          </span>
          <span className="bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm">
            Completed: {completedCount}
          </span>
        </div>
      </div>
      <ul>
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center flex-1">
                <span
                  onClick={() => toggleComplete(idx)}
                  className={`w-5 h-5 rounded-full mr-4 flex-shrink-0 border-2 flex items-center justify-center transition-all cursor-pointer ${
                    item.completed
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-purple-600'
                  }`}
                >
                  {item.completed && <CheckIcon className="w-3 h-3 text-white" />}
                </span>
                <div
                  className={`flex-1 py-3 ${
                    idx < items.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  {editingIndex === idx ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={e => setEditingText(e.target.value)}
                      onKeyDown={e => handleEditKey(e, idx)}
                      autoFocus
                      className="w-full bg-transparent border-none outline-none font-mono text-lg placeholder-gray-300"
                    />
                  ) : (
                    <span
                      className={`font-mono text-lg ${
                        item.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                      }`}
                    >
                      {item.text}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                {editingIndex !== idx && !item.completed && (
                  <PencilIcon
                    onClick={() => startEdit(idx)}
                    className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer mr-2"
                  />
                )}
                {editingIndex === idx && (
                  <CheckIcon
                    onClick={() => saveEdit(idx)}
                    className="w-5 h-5 text-green-500 cursor-pointer mr-2"
                  />
                )}
                {editingIndex !== idx && (
                  <TrashIcon
                    onClick={() => confirmDelete(idx)}
                    className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer"
                  />
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-2 flex flex-col space-y-1">
        <div className="flex items-center border-t border-b border-gray-200 py-2">
          <div
            onClick={handleAddItem}
            className={`w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white mr-3 cursor-pointer ${
              !isAddEnabled && 'opacity-50 cursor-not-allowed'
            }`}
          >
            <PlusIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddItem()}
            placeholder="Memorize the dictionary"
            className="flex-1 bg-transparent border-none outline-none font-mono text-lg placeholder-gray-300"
          />
          <button
            onClick={handleAddItem}
            disabled={!isAddEnabled}
            className="ml-4 py-1 px-2 bg-purple-600 hover:bg-purple-700 transition-colors text-white font-mono text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
        {validationError && (
          <p className="text-red-500 text-sm ml-9">{validationError}</p>
        )}
      </div>
      {pendingDelete !== null && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 max-w-sm w-full">
            <p className="text-gray-800 mb-4">Delete this item?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
