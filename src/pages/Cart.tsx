import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { CheckoutModal } from '../components/cart/CheckoutModal';
import { computeCartTotal, computeCartItemsCount } from '../utils/calculations';
import { FloralSticker } from '../components/decorations/FloralSticker';
import { Sparkle } from '../components/decorations/Sparkle';
import { ArrowLeft, Package } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';

export const Cart: React.FC = () => {
  const { cart, clearCart } = useProducts();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalAmount = computeCartTotal(cart);
  const totalUnits = computeCartItemsCount(cart);

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#08734B', '#F4A0C6', '#FAF9F4', '#A9C5B7'],
      });
    } catch {
      // Ignore
    }
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = () => {
    clearCart();
    navigate('/products');
  };

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '70px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="boutique-tag">Boutique Shopping Bag</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {cart.length} item{cart.length === 1 ? '' : 's'} selected
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              color: 'var(--color-green)',
              marginTop: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            Your Lovely Shopping Bag
            <Sparkle size={18} color="#F4A0C6" />
          </h1>
        </div>

        <Link to="/products" className="btn-secondary" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
          <ArrowLeft size={16} weight="bold" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {cart.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            border: '2px dashed var(--color-green-sage)',
            padding: '70px 20px',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '40px auto',
          }}
        >
          <FloralSticker size={72} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: 'var(--color-green)',
              marginTop: '18px',
              marginBottom: '8px',
            }}
          >
            Your Bag is Currently Empty
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '26px' }}>
            Browse our curated inventory collection and add your favorite items to your lovely bag.
          </p>
          <Link to="/products" className="btn-primary" style={{ padding: '12px 28px' }}>
            <Package size={18} weight="bold" />
            <span>Explore Products</span>
          </Link>
        </div>
      ) : (
        <div
          className="cart-grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 0.9fr)',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* Cart Items List */}
          <div>
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Cart Order Summary */}
          <div>
            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      )}

      {/* Checkout Success Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleConfirmOrder}
        totalAmount={totalAmount}
        itemCount={totalUnits}
      />
    </div>
  );
};
