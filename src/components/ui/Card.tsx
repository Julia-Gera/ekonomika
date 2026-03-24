import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  className = '',
  hoverable = false,
  padding = 'md',
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg border border-gray-200';
  const hoverClasses = hoverable ? 'transition-shadow duration-200 hover:shadow-lg' : 'shadow-sm';
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
