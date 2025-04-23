import React, { ChangeEvent, KeyboardEvent } from 'react';
import { CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface TodoItemProps {
  text: string;
  completed: boolean;
  isLast: boolean;
  isEditing: boolean;
  editingText: string;
  onToggle: () => void;
  onEdit: () => void;
  onSave: () => void;
  onDelete: () => void;
  onChangeEditing: (v: string) => void;
  onKeyDownEditing: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const TodoItemComponent: React.FC<TodoItemProps> = ({
  text,
  completed,
  isLast,
  isEditing,
  editingText,
  onToggle,
  onEdit,
  onSave,
  onDelete,
  onChangeEditing,
  onKeyDownEditing,
}) => (
  <motion.li
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="flex items-center justify-between"
  >
    <div className="flex items-center flex-1">
      <span
        onClick={onToggle}
        className={`w-5 h-5 rounded-full mr-4 flex-shrink-0 border-2 flex items-center justify-center cursor-pointer ${
          completed ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
        }`}
      >
        {completed && <CheckIcon className="w-3 h-3 text-white" />}
      </span>
      <div className={`flex-1 py-3 ${!isLast ? 'border-b border-gray-200' : ''}`}> 
        {isEditing ? (
          <input
            type="text"
            value={editingText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeEditing(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => onKeyDownEditing(e)}
            autoFocus
            className="w-full bg-transparent border-none outline-none font-mono text-lg placeholder-gray-300"
          />
        ) : (
          <span
            className={`font-mono text-lg ${
              completed ? 'text-gray-400 line-through' : 'text-gray-800'
            }`}
          >
            {text}
          </span>
        )}
      </div>
    </div>
    <div className="flex items-center">
      {!completed && !isEditing && (
        <PencilIcon
          onClick={onEdit}
          className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer mr-2"
        />
      )}
      {isEditing && (
        <CheckIcon
          onClick={onSave}
          className="w-5 h-5 text-green-500 cursor-pointer mr-2"
        />
      )}
      <TrashIcon
        onClick={onDelete}
        className={`w-5 h-5 cursor-pointer ${
          completed ? 'text-gray-300' : 'text-gray-400 hover:text-red-500'
        }`}
      />
    </div>
  </motion.li>
);