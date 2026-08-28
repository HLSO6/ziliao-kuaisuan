import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseClasses = 'py-3 px-6 rounded-lg font-medium text-center transition';
  
  const variantClasses = variant === 'primary'
    ? 'bg-primary text-white hover:bg-opacity-90'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    
  const disabledClass = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;