import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface TodoInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  enabled: boolean;
  error: string;
}

export const TodoInput: React.FC<TodoInputProps> = ({ value, onChange, onSubmit, enabled, error }) => (
  <div className="flex flex-col space-y-1">
    <div className="flex items-center border-t border-b border-gray-200 py-1.5">
      <div
        onClick={enabled ? onSubmit : undefined}
        className={`w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white mr-3 ${
          !enabled && 'opacity-50 cursor-not-allowed'
        }`}
      >
        <PlusIcon className="w-6 h-6" />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
        autoFocus
        placeholder="Memorize the dictionary"
        className="flex-1 bg-transparent border-none outline-none font-mono text-lg placeholder-gray-300"
      />
      <button
        onClick={enabled ? onSubmit : undefined}
        disabled={!enabled}
        className="ml-4 py-1 px-4 bg-purple-600 hover:bg-purple-700 transition-colors text-white font-mono text-sm rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </div>
    {error && <p className="text-red-500 text-sm ml-9">{error}</p>}
  </div>
);