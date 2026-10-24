import React from 'react';
import { ProductForm } from '../components/products/ProductForm';
import { Sparkle } from '../components/decorations/Sparkle';

export const AddProduct: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '70px', maxWidth: '860px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkle size={14} color="#F4A0C6" />
          <span className="boutique-tag">Product Registration</span>
          <Sparkle size={14} color="#F4A0C6" />
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.5rem',
            color: 'var(--color-green)',
            marginBottom: '8px',
          }}
        >
          Add New Product to Inventory
        </h1>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', maxWidth: '580px', margin: '0 auto' }}>
          Fill in each specification below. Your product will immediately be added to the live catalog, with real-time subtotal and overall inventory computation.
        </p>
      </div>

      <ProductForm />
    </div>
  );
};
