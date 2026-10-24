import React from 'react';

interface ScallopedBadgeProps {
  title?: string;
  subtitle?: string;
  size?: number;
  bg?: string;
  border?: string;
  textColor?: string;
  className?: string;
}

export const ScallopedBadge: React.FC<ScallopedBadgeProps> = ({
  title = 'BloomStock',
  subtitle = 'EST. 2026',
  size = 96,
  bg = '#FAF9F4',
  border = '#08734B',
  textColor = '#08734B',
  className = '',
}) => {
  return (
    <div
      className={`scalloped-stamp-badge ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {/* 12-lobed decorative scalloped circle */}
        <path
          d="M50 4 
             C56 4 58 10 64 12
             C70 14 75 12 79 16
             C84 21 82 26 85 32
             C88 38 94 40 94 46
             C94 52 88 55 86 61
             C84 67 86 73 82 78
             C77 82 71 81 66 85
             C61 89 57 95 50 95
             C43 95 39 89 34 85
             C29 81 23 82 18 78
             C14 73 16 67 14 61
             C12 55 6 52 6 46
             C6 40 12 38 15 32
             C18 26 16 21 21 16
             C25 12 30 14 36 12
             C42 10 44 4 50 4 Z"
          fill={bg}
          stroke={border}
          strokeWidth="2.5"
        />
        <circle cx="50" cy="50" r="36" fill="none" stroke={border} strokeWidth="1" strokeDasharray="3 3" />
      </svg>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: textColor,
          padding: '6px',
        }}
      >
        <div style={{ fontFamily: 'var(--font-script)', fontSize: size * 0.18, lineHeight: 1 }}>
          {title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: size * 0.09,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
};

