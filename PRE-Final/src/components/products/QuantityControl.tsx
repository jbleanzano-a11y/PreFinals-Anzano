import React from 'react';
import { Minus, Plus } from '@phosphor-icons/react';

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 0,
  max,
  size = 'md',
  disabled = false,
}) => {
  const canDecrease = !disabled && quantity > min;
  const canIncrease = !disabled && (max === undefined || quantity < max);

  const dimension = size === 'sm' ? '28px' : size === 'lg' ? '38px' : '32px';
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: '#FAF9F4',
        border: '1.5px solid var(--color-green)',
        borderRadius: '9999px',
        padding: '3px 6px',
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (canDecrease) onDecrease();
        }}
        disabled={!canDecrease}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          border: '1px solid var(--color-green)',
          color: 'var(--color-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canDecrease ? 'pointer' : 'not-allowed',
          opacity: canDecrease ? 1 : 0.4,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          if (canDecrease) {
            e.currentTarget.style.backgroundColor = 'var(--color-pink-soft)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (canDecrease) {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        aria-label="Decrease quantity"
      >
        <Minus size={iconSize} weight="bold" />
      </button>

      <span
        style={{
          minWidth: size === 'sm' ? '24px' : '32px',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: size === 'sm' ? '0.85rem' : size === 'lg' ? '1.1rem' : '0.95rem',
          color: 'var(--color-text-dark)',
          userSelect: 'none',
        }}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (canIncrease) onIncrease();
        }}
        disabled={!canIncrease}
        style={{
          width: dimension,
          height: dimension,
          borderRadius: '50%',
          backgroundColor: 'var(--color-green)',
          border: '1px solid var(--color-green-dark)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canIncrease ? 'pointer' : 'not-allowed',
          opacity: canIncrease ? 1 : 0.4,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          if (canIncrease) {
            e.currentTarget.style.backgroundColor = 'var(--color-green-dark)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (canIncrease) {
            e.currentTarget.style.backgroundColor = 'var(--color-green)';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        aria-label="Increase quantity"
      >
        <Plus size={iconSize} weight="bold" />
      </button>
    </div>
  );
};

