import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-bg-secondary border border-border-custom p-4 ${className}`}>
      {children}
    </div>
  )
}

export const Button: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'danger'
}> = ({ children, onClick, className = '', disabled, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-green-neon text-bg-primary hover:bg-green-mid',
    secondary: 'bg-bg-tertiary text-text-primary border border-border-custom hover:bg-bg-secondary',
    danger: 'bg-danger text-white hover:bg-red-600',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-3 font-display text-xl transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <span className={`px-2 py-1 text-xs font-mono rounded-full bg-green-dark text-green-mid border border-green-mid/30 ${className}`}>
      {children}
    </span>
  )
}
