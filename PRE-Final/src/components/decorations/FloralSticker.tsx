import React from 'react';

interface FloralStickerProps {
  size?: number;
  petalColor?: string;
  centerColor?: string;
  dotColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FloralSticker: React.FC<FloralStickerProps> = ({
  size = 32,
  petalColor = '#F4A0C6',
  centerColor = '#08734B',
  dotColor = '#FAF9F4',
  className = '',
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      {/* 5 rounded petals matching the reference graphic */}
      <circle cx="50" cy="22" r="18" fill={petalColor} />
      <circle cx="77" cy="41" r="18" fill={petalColor} />
      <circle cx="67" cy="74" r="18" fill={petalColor} />
      <circle cx="33" cy="74" r="18" fill={petalColor} />
      <circle cx="23" cy="41" r="18" fill={petalColor} />
      {/* Flower Center */}
      <circle cx="50" cy="50" r="14" fill={centerColor} />
      <circle cx="50" cy="50" r="6" fill={dotColor} />
    </svg>
  );
};

export const MiniFlower: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 18,
  color = '#08734B',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ verticalAlign: 'middle', display: 'inline-block' }}
    >
      <circle cx="12" cy="6" r="3.5" fill={color} />
      <circle cx="17.7" cy="10.2" r="3.5" fill={color} />
      <circle cx="15.5" cy="17" r="3.5" fill={color} />
      <circle cx="8.5" cy="17" r="3.5" fill={color} />
      <circle cx="6.3" cy="10.2" r="3.5" fill={color} />
      <circle cx="12" cy="12" r="2.8" fill="#F4A0C6" />
    </svg>
  );
};

