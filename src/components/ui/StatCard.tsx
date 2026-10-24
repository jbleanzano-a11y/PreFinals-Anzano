import React from 'react';
import { motion } from 'framer-motion';
import { FloralSticker } from '../decorations/FloralSticker';
import { Sparkle } from '../decorations/Sparkle';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string;
  isHighlight?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  icon,
  accentColor = '#08734B',
  isHighlight = false,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 12px 28px rgba(8, 115, 75, 0.12)' }}
      transition={{ duration: 0.2 }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid var(--color-green)',
        padding: '22px 20px',
        position: 'relative',
        boxShadow: isHighlight
          ? '4px 4px 0px var(--color-pink)'
          : '3px 3px 0px var(--color-green-sage)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Decorative top scallop accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: isHighlight
            ? 'linear-gradient(90deg, #F4A0C6 0%, #08734B 100%)'
            : 'repeating-linear-gradient(90deg, #08734B 0px, #08734B 10px, #FAD9E8 10px, #FAD9E8 20px)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkle size={14} color="#F4A0C6" />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-green-dark)',
            }}
          >
            {label}
          </span>
        </div>

        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: isHighlight ? 'var(--color-pink-soft)' : 'var(--color-green-pale)',
            border: '1.5px solid var(--color-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-green)',
            flexShrink: 0,
          }}
        >
          {icon || <FloralSticker size={20} petalColor="#F4A0C6" centerColor="#08734B" />}
        </div>
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: typeof value === 'string' && value.length > 8 ? '1.75rem' : '2.3rem',
            fontWeight: 800,
            color: accentColor,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.82rem',
              color: 'var(--color-text-muted)',
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{subtitle}</span>
          </div>
        )}
      </div>

      {/* Subtle corner watermark flower */}
      <div
        style={{
          position: 'absolute',
          bottom: '-14px',
          right: '-14px',
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        <FloralSticker size={72} petalColor="#08734B" centerColor="#F4A0C6" />
      </div>
    </motion.div>
  );
};

