import React from 'react';
import { Star } from '@phosphor-icons/react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (newRating: number) => void;
  showScore?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 18,
  interactive = false,
  onChange,
  showScore = true,
}) => {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = rating >= starValue;
          const isHalf = !isFilled && rating >= starValue - 0.5;

          return (
            <button
              type="button"
              key={starValue}
              disabled={!interactive}
              onClick={() => interactive && onChange && onChange(starValue)}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px',
                cursor: interactive ? 'pointer' : 'default',
                color: isFilled || isHalf ? '#E89218' : '#D1DCD6',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (interactive) (e.currentTarget.style.transform = 'scale(1.25)');
              }}
              onMouseLeave={(e) => {
                if (interactive) (e.currentTarget.style.transform = 'scale(1)');
              }}
              title={interactive ? `Set rating to ${starValue}` : `Rating: ${rating}`}
            >
              <Star
                size={size}
                weight={isFilled ? 'fill' : isHalf ? 'duotone' : 'regular'}
                color={isFilled || isHalf ? '#E89218' : '#B5C9C0'}
              />
            </button>
          );
        })}
      </div>
      {showScore && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: 800,
            color: 'var(--color-text-dark)',
            marginLeft: '2px',
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

