import React from 'react';

interface BadgeProps {
  label: string;
  variant: 'total' | 'completed';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant }) => (
  <span
    className={`rounded-full px-3 py-1 text-sm ${
      variant === 'total' ? 'bg-gray-200 text-gray-800' : 'bg-purple-100 text-purple-800'
    }`}
  >
    {label}
  </span>
);