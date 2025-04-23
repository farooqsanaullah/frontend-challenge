import React, { KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import { todoListState, todoStatisticsState } from '../state/atoms';
import { Badge } from './Badge';
import { ConfirmModal } from './ConfirmModal';
import { TodoInput } from './TodoInput';
import { TodoItemComponent } from './TodoItem';

export const TodoList: React.FC = () => {
  const [items, setItems] = useRecoilState(todoListState);
  const stats = useRecoilValue(todoStatisticsState);
  const [newItem, setNewItem] = React.useState('');
  const [pendingDelete, setPendingDelete] = React.useState<number | null>(null);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editingText, setEditingText] = React.useState('');

  const trimmedNew = newItem.trim();
  const isAddEnabled = trimmedNew.length >= 3 && trimmedNew.length <= 25;
  const validationError = trimmedNew.length > 0 && !isAddEnabled
    ? trimmedNew.length < 3
      ? 'Minimum 3 characters required.'
      : 'Maximum 25 characters allowed.'
    : '';

  const addItem = () => {
    if (!isAddEnabled) return;
    const formatted = trimmedNew.charAt(0).toUpperCase() + trimmedNew.slice(1);
    setItems(prev => [...prev, { text: formatted, completed: false }]);
    setNewItem('');
    setEditingIndex(null);
    setEditingText('');
  };

  const toggleComplete = (idx: number) => {
    setItems(prev =>
      prev.map((item, i) => (i === idx ? { ...item, completed: !item.completed } : item))
    );
    if (editingIndex === idx) setEditingIndex(null);
  };

  const startEdit = (idx: number) => {
    setEditingIndex(idx);
    setEditingText(items[idx].text);
  };

  const saveEdit = (idx: number) => {
    const trimmed = editingText.trim();
    if (trimmed.length < 1) return;
    setItems(prev =>
      prev.map((item, i) => (i === idx ? { ...item, text: trimmed } : item))
    );
    setEditingIndex(null);
    setEditingText('');
  };

  const onKeyDownEditing = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingIndex !== null) saveEdit(editingIndex);
    if (e.key === 'Escape') setEditingIndex(null);
  };

  const confirmDeleteItem = (idx: number) => setPendingDelete(idx);
  const deleteItem = () => {
    if (pendingDelete !== null) {
      setItems(prev => prev.filter((_, i) => i !== pendingDelete));
      const newIdx = editingIndex === null
        ? null
        : editingIndex === pendingDelete
          ? null
          : editingIndex > pendingDelete
            ? editingIndex - 1
            : editingIndex;
      setEditingIndex(newIdx);
      if (newIdx === null) {
        setEditingText('');
      }
      setPendingDelete(null);
    }
  };
  const cancelDelete = () => setPendingDelete(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">Todo List</h1>
        <div className="flex space-x-2">
          <Badge label={`Total: ${stats.total}`} variant="total" />
          <Badge label={`Completed: ${stats.completed}`} variant="completed" />
        </div>
      </div>
      
      <ul>
        <AnimatePresence>
          {items.map((item, idx) => (
            <TodoItemComponent
              key={idx}
              text={item.text}
              completed={item.completed}
              isLast={idx === items.length - 1}
              isEditing={editingIndex === idx}
              editingText={editingText}
              onToggle={() => toggleComplete(idx)}
              onEdit={() => startEdit(idx)}
              onSave={() => saveEdit(idx)}
              onDelete={() => confirmDeleteItem(idx)}
              onChangeEditing={setEditingText}
              onKeyDownEditing={onKeyDownEditing}
            />
          ))}
        </AnimatePresence>
      </ul>
      <TodoInput
        value={newItem}
        onChange={setNewItem}
        onSubmit={addItem}
        enabled={isAddEnabled}
        error={validationError}
      />
      {pendingDelete !== null && (
        <ConfirmModal
          message="Delete this item?"
          onConfirm={deleteItem}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};