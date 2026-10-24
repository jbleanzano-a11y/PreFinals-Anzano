import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { computeCartTotal, computeCartItemsCount } from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { Sparkle } from '../decorations/Sparkle';
import { FloralSticker } from '../decorations/FloralSticker';
import { ArrowRight, Trash } from '@phosphor-icons/react';

interface CartSummaryProps {
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { cart, clearCart } = useProducts();

  const totalAmount = computeCartTotal(cart);
  const totalUnits = computeCartItemsCount(cart);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '2px solid var(--color-green)',
        boxShadow: '5px 5px 0px var(--color-pink)',
        padding: '24px',
        position: 'sticky',
        top: '100px',
      }}
    >
      {/* Decorative Stamp Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            color: 'var(--color-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Sparkle size={16} color="#F4A0C6" />
          Bag Summary
        </h3>
        <FloralSticker size={24} petalColor="#F4A0C6" centerColor="#08734B" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          <span>Total Bag Items:</span>
          <strong>{cart.length} distinct products</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          <span>Total Quantities:</span>
          <strong>{totalUnits} units</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          <span>Shipping & Handling:</span>
          <span style={{ color: 'var(--color-green)', fontWeight: 800 }}>Free (Country Club Perk)</span>
        </div>

        <div
          style={{
            borderTop: '2px dashed rgba(8, 115, 75, 0.2)',
            paddingTop: '14px',
            marginTop: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              fontWeight: 800,
              color: 'var(--color-green-dark)',
            }}
          >
            Grand Total:
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.85rem',
              fontWeight: 800,
              color: 'var(--color-green)',
            }}
          >
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          type="button"
          onClick={onCheckout}
          disabled={cart.length === 0}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1rem',
          }}
        >
          <span>Complete Bag Order</span>
          <ArrowRight size={18} weight="bold" />
        </button>

        <button
          type="button"
          onClick={clearCart}
          disabled={cart.length === 0}
          className="btn-secondary"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '0.85rem',
            color: '#B91C1C',
            borderColor: '#FCA5A5',
          }}
        >
          <Trash size={15} />
          <span>Clear Shopping Bag</span>
        </button>
      </div>
    </div>
  );
};

