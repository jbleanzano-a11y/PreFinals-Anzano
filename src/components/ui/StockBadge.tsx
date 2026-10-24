import React from 'react';
import { getStockStatus, getStockStatusLabel } from '../../utils/calculations';
import type { StockStatus } from '../../types/product';
import { Sparkle } from '../decorations/Sparkle';

interface StockBadgeProps {
  quantity: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const StockBadge: React.FC<StockBadgeProps> = ({
  quantity,
  size = 'md',
  showCount = true,
}) => {
  const status: StockStatus = getStockStatus(quantity);
  const label = getStockStatusLabel(status);

  // Style configs
  const config = {
    IN_STOCK: {
      bg: '#E7F5EE',
      border: '#08734B',
      text: '#08734B',
      dot: '#08734B',
      sparkleColor: '#08734B',
      iconText: '✓',
    },
    LOW_STOCK: {
      bg: '#FFF2DF',
      border: '#D97706',
      text: '#B45309',
      dot: '#D97706',
      sparkleColor: '#D97706',
      iconText: '!',
    },
    OUT_OF_STOCK: {
      bg: '#FEE2E2',
      border: '#DC2626',
      text: '#B91C1C',
      dot: '#DC2626',
      sparkleColor: '#DC2626',
      iconText: '✕',
    },
  }[status];

  const sizeStyles = {
    sm: { padding: '3px 8px', fontSize: '0.72rem', gap: '4px' },
    md: { padding: '5px 12px', fontSize: '0.8rem', gap: '6px' },
    lg: { padding: '7px 16px', fontSize: '0.88rem', gap: '8px' },
  }[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: config.bg,
        border: `1.5px solid ${config.border}`,
        color: config.text,
        borderRadius: '9999px',
        fontWeight: 700,
        letterSpacing: '0.03em',
        boxShadow: '1px 1px 0px rgba(0,0,0,0.06)',
        ...sizeStyles,
      }}
      title={`Stock Status: ${label}`}
    >
      <span
        style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: config.dot,
          display: 'inline-block',
        }}
      />
      {status === 'LOW_STOCK' && <Sparkle size={10} color={config.sparkleColor} />}
      <span>{label}</span>
      {showCount && (
        <span
          style={{
            opacity: 0.85,
            fontSize: '0.9em',
            paddingLeft: '2px',
          }}
        >
          ({quantity} {quantity === 1 ? 'unit' : 'units'})
        </span>
      )}
    </span>
  );
};
