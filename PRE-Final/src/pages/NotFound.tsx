import React from 'react';
import { Link } from 'react-router-dom';
import { FloralSticker } from '../components/decorations/FloralSticker';
import { House } from '@phosphor-icons/react';

export const NotFound: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '80px', paddingBottom: '90px', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '28px',
          border: '2px solid var(--color-green)',
          boxShadow: '6px 6px 0px var(--color-pink)',
          padding: '48px 32px',
        }}
      >
        <FloralSticker size={72} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />

        <div
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '4.5rem',
            color: 'var(--color-green)',
            lineHeight: 1,
            marginTop: '16px',
          }}
        >
          404
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            color: 'var(--color-text-dark)',
            marginBottom: '12px',
          }}
        >
          Page Not Found
        </h2>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '28px' }}>
          We could not find the lovely page you were looking for. Let’s head back to the BloomStock sanctuary.
        </p>

        <Link to="/" className="btn-primary" style={{ padding: '12px 28px' }}>
          <House size={18} weight="bold" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};
