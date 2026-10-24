import React from 'react';
import { Link } from 'react-router-dom';
import { FloralSticker } from '../decorations/FloralSticker';
import { Sparkle } from '../decorations/Sparkle';
import { ScallopedBadge } from '../decorations/ScallopedBadge';
import { Heart } from '@phosphor-icons/react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: '80px',
        borderTop: '2px solid var(--color-green)',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Preppy striped top band */}
      <div className="preppy-stripes-horizontal" style={{ height: '12px', width: '100%' }} />

      <div className="container" style={{ padding: '50px 20px 30px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '40px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <FloralSticker size={28} petalColor="#F4A0C6" centerColor="#08734B" />
              <span
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '2.4rem',
                  color: 'var(--color-green)',
                  lineHeight: 1,
                }}
              >
                BloomStock
              </span>
            </div>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              A charming pastel preppy space to manage products, calculate real-time inventory values, and track stocks with boutique elegance.
            </p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="boutique-tag">EST. 2026</span>
              <span className="boutique-tag" style={{ borderColor: 'var(--color-pink)', color: 'var(--color-green-dark)' }}>
                Country Club Edition
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: 'var(--color-green)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkle size={14} color="#F4A0C6" />
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-dark)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Home Dashboard
                </Link>
              </li>
              <li>
                <Link to="/products" style={{ textDecoration: 'none', color: 'var(--color-text-dark)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/add-product" style={{ textDecoration: 'none', color: 'var(--color-text-dark)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Add New Product
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--color-text-dark)', fontSize: '0.9rem', fontWeight: 600 }}>
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Context / Exam Requirements */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: 'var(--color-green)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkle size={14} color="#F4A0C6" />
              Course Pre-Final Exam
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
              <strong>Computer Communication Development Institute (CCDI)</strong>
              <br />
              Rizal St., Sorsogon City
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              React Components • Dynamic State Management • Subtotal & Overall Value Calculation • Category Filtering • Stock Highlights.
            </p>
          </div>

          {/* Stamp Badge Showcase */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ScallopedBadge
              title="Bloom"
              subtitle="PRE-FINAL 2026"
              size={110}
              bg="#FAF9F4"
              border="#08734B"
              textColor="#08734B"
              className="anim-float-gentle"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-gray-light)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.82rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>BloomStock © 2026 Crafted with</span>
            <Heart size={14} weight="fill" color="#F4A0C6" />
            <span>in Pastel Preppy Country Club Style</span>
          </div>

          <div>
            <span>All values calculated automatically in <strong>Philippine Pesos (PHP ₱)</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

