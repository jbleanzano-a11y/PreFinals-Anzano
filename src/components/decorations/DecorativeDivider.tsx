import React from 'react';
import { FloralSticker } from './FloralSticker';
import { Sparkle } from './Sparkle';

interface DecorativeDividerProps {
  label?: string;
  className?: string;
}

export const DecorativeDivider: React.FC<DecorativeDividerProps> = ({ label, className = '' }) => {
  return (
    <div
      className={`decorative-divider ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        margin: '28px 0',
        width: '100%',
      }}
    >
      <div
        style={{
          flex: 1,
          height: '1.5px',
          background: 'linear-gradient(to right, transparent, var(--color-green-sage))',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkle size={14} color="#F4A0C6" />
        <FloralSticker size={20} petalColor="#F4A0C6" centerColor="#08734B" />
        {label && (
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: 'var(--color-green)',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </span>
        )}
        <FloralSticker size={20} petalColor="#F4A0C6" centerColor="#08734B" />
        <Sparkle size={14} color="#F4A0C6" />
      </div>
      <div
        style={{
          flex: 1,
          height: '1.5px',
          background: 'linear-gradient(to left, transparent, var(--color-green-sage))',
        }}
      />
    </div>
  );
};

export const CountryClubTopBar: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-green)',
        color: '#ffffff',
        padding: '8px 16px',
        fontSize: '0.82rem',
        fontWeight: 800,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
      }}
    >
      <Sparkle size={12} color="#F4A0C6" />
      <span>BLOOMSTOCK INVENTORY COLLECTION</span>
      <span style={{ opacity: 0.6 }}>•</span>
      <span style={{ fontFamily: 'var(--font-script)', textTransform: 'none', fontSize: '1.15rem', fontWeight: 400 }}>
        Your Lovely Product Space
      </span>
      <Sparkle size={12} color="#F4A0C6" />
    </div>
  );
};

