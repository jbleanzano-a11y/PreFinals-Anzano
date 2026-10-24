import React from 'react';
import { Link } from 'react-router-dom';
import type { CartItem as CartItemType } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { computeSubtotal } from '../../utils/calculations';
import { QuantityControl } from '../products/QuantityControl';
import { useProducts } from '../../context/ProductContext';
import { Trash } from '@phosphor-icons/react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useProducts();
  const subtotal = computeSubtotal(item.product.price, item.cartQuantity);

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid var(--color-green)',
        boxShadow: '3px 3px 0px rgba(8, 115, 75, 0.08)',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto auto',
        gap: '16px',
        alignItems: 'center',
        marginBottom: '14px',
      }}
    >
      {/* Product Image */}
      <img
        src={item.product.image}
        alt={item.product.name}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '14px',
          objectFit: 'cover',
          border: '1.5px solid var(--color-green)',
          backgroundColor: 'var(--color-pink-soft)',
        }}
      />

      {/* Details */}
      <div>
        <span className="boutique-tag" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
          {item.product.category}
        </span>
        <Link
          to={`/products/${item.product.id}`}
          style={{
            display: 'block',
            textDecoration: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--color-green-dark)',
            marginTop: '4px',
            marginBottom: '4px',
          }}
        >
          {item.product.name}
        </Link>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Unit Price: <strong>{formatCurrency(item.product.price)}</strong>
        </span>
      </div>

      {/* Quantity Control & Subtotal */}
      <div style={{ textAlign: 'center', padding: '0 8px' }}>
        <QuantityControl
          quantity={item.cartQuantity}
          onIncrease={() => updateCartQuantity(item.product.id, item.cartQuantity + 1)}
          onDecrease={() => updateCartQuantity(item.product.id, item.cartQuantity - 1)}
          min={1}
          size="sm"
        />
        <div style={{ marginTop: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Subtotal: </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              fontSize: '1.02rem',
              color: 'var(--color-green)',
            }}
          >
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => removeFromCart(item.product.id)}
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#FAF9F4',
          border: '1px solid #DC2626',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FEE2E2';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FAF9F4';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Remove item from bag"
      >
        <Trash size={16} />
      </button>
    </div>
  );
};
