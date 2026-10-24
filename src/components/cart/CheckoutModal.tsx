import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/currency';
import { FloralSticker } from '../decorations/FloralSticker';
import { CheckCircle, X } from '@phosphor-icons/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
  itemCount: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  itemCount,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(7, 88, 61, 0.45)',
          backdropFilter: 'blur(6px)',
          padding: '20px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            border: '2px solid var(--color-green)',
            boxShadow: '6px 6px 0px var(--color-pink)',
            maxWidth: '460px',
            width: '100%',
            padding: '32px 28px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: '4px',
            }}
          >
            <X size={20} weight="bold" />
          </button>

          <FloralSticker size={54} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />

          <div
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: '2.4rem',
              color: 'var(--color-green)',
              marginTop: '12px',
              lineHeight: 1,
            }}
          >
            Lovely Order Placed!
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--color-text-dark)',
              marginTop: '6px',
              marginBottom: '12px',
            }}
          >
            Thank You for Shopping at BloomStock
          </h3>

          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
            Your boutique order for <strong>{itemCount} item(s)</strong> totaling{' '}
            <strong style={{ color: 'var(--color-green)' }}>{formatCurrency(totalAmount)}</strong> has been processed successfully!
          </p>

          <div
            style={{
              backgroundColor: '#FAF9F4',
              borderRadius: '16px',
              border: '1px solid var(--color-green-sage)',
              padding: '16px',
              marginBottom: '24px',
              textAlign: 'left',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Order ID:</span>
              <strong>#BS-{Math.floor(100000 + Math.random() * 900000)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Status:</span>
              <span style={{ color: 'var(--color-green)', fontWeight: 800 }}>Confirmed ✓</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Calculated Total:</span>
              <strong style={{ color: 'var(--color-green-dark)' }}>{formatCurrency(totalAmount)}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '12px 24px' }}
            >
              <CheckCircle size={18} weight="bold" />
              <span>Back to Inventory</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
