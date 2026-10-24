import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { X, CheckCircle, Info, WarningCircle } from '@phosphor-icons/react';
import { Sparkle } from '../decorations/Sparkle';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useProducts();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              pointerEvents: 'auto',
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--color-green)',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '4px 4px 0px var(--color-pink), 0 10px 25px rgba(0,0,0,0.08)',
              maxWidth: '380px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor:
                  toast.type === 'warning'
                    ? '#FFF2DF'
                    : toast.type === 'info'
                    ? 'var(--color-pink-soft)'
                    : 'var(--color-green-pale)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color:
                  toast.type === 'warning'
                    ? '#D97706'
                    : toast.type === 'info'
                    ? 'var(--color-green-dark)'
                    : 'var(--color-green)',
              }}
            >
              {toast.type === 'warning' ? (
                <WarningCircle size={20} weight="fill" />
              ) : toast.type === 'info' ? (
                <Info size={20} weight="fill" />
              ) : (
                <CheckCircle size={20} weight="fill" />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  color: 'var(--color-text-dark)',
                  lineHeight: 1.35,
                }}
              >
                {toast.message}
              </div>
            </div>

            <Sparkle size={14} color="#F4A0C6" />

            <button
              onClick={hideToast}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

