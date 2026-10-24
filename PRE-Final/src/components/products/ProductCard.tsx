import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types/product';
import { formatCurrency } from '../../utils/currency';
import { computeSubtotal } from '../../utils/calculations';
import { StockBadge } from '../ui/StockBadge';
import { RatingStars } from '../ui/RatingStars';
import { QuantityControl } from './QuantityControl';
import { useProducts } from '../../context/ProductContext';
import { ShoppingCart, Eye, Sparkle as PhosphorSparkle } from '@phosphor-icons/react';
import { Sparkle } from '../decorations/Sparkle';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { increaseQuantity, decreaseQuantity, addToCart } = useProducts();

  const subtotal = computeSubtotal(product.price, product.quantity);
  const isOutOfStock = product.quantity <= 0;
  const isLowStock = product.quantity > 0 && product.quantity < 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid var(--color-green)',
        boxShadow: '4px 4px 0px rgba(8, 115, 75, 0.12)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {/* Decorative top accent stripes if low stock or featured */}
      {isLowStock && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: '#D97706',
          }}
        />
      )}

      {/* Image Container with Soft Blush Pink background & rounded boutique frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          borderRadius: '18px',
          backgroundColor: 'var(--color-pink-soft)',
          overflow: 'hidden',
          border: '1.5px solid rgba(8, 115, 75, 0.25)',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Category Pill on top left */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(250, 249, 244, 0.95)',
            border: '1px solid var(--color-green)',
            borderRadius: '9999px',
            padding: '4px 10px',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            color: 'var(--color-green-dark)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Sparkle size={10} color="#F4A0C6" />
          <span>{product.category}</span>
        </div>

        {/* Feature badge or corner floral sticker */}
        {product.isFeatured && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'var(--color-pink)',
              color: 'var(--color-green-dark)',
              borderRadius: '9999px',
              padding: '3px 8px',
              fontSize: '0.68rem',
              fontWeight: 800,
              border: '1px solid var(--color-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <PhosphorSparkle size={10} weight="fill" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Product Content Body */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Rating and Stock Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px',
            flexWrap: 'wrap',
            gap: '6px',
          }}
        >
          <RatingStars rating={product.rating} size={15} />
          <StockBadge quantity={product.quantity} size="sm" showCount={false} />
        </div>

        {/* Product Title */}
        <Link
          to={`/products/${product.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.18rem',
              fontWeight: 700,
              color: 'var(--color-green)',
              lineHeight: 1.3,
              marginBottom: '6px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
            }}
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Pricing & Computed Subtotal Display */}
        <div
          style={{
            backgroundColor: '#FAF9F4',
            borderRadius: '12px',
            padding: '10px 12px',
            border: '1px solid rgba(8, 115, 75, 0.15)',
            margin: '10px 0 14px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Unit Price:
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.05rem',
                color: 'var(--color-green-dark)',
              }}
            >
              {formatCurrency(product.price)}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              borderTop: '1px dashed rgba(8, 115, 75, 0.2)',
              paddingTop: '4px',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--color-green)', fontWeight: 800, textTransform: 'uppercase' }}>
              Subtotal:
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: isOutOfStock ? 'var(--color-text-light)' : 'var(--color-green)',
              }}
            >
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>

        {/* Quantity Controls (Exam PDF Requirement: buttons to add/remove quantity, conditional rendering) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
            Stock Qty:
          </span>

          <QuantityControl
            quantity={product.quantity}
            onIncrease={() => increaseQuantity(product.id)}
            onDecrease={() => decreaseQuantity(product.id)}
            min={0}
            size="sm"
          />
        </div>

        {/* Action Buttons: Add to Cart & View Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginTop: 'auto' }}>
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            disabled={isOutOfStock}
            className={isOutOfStock ? '' : 'btn-primary'}
            style={
              isOutOfStock
                ? {
                    padding: '10px',
                    borderRadius: '9999px',
                    backgroundColor: '#E8EAE5',
                    color: '#89A89C',
                    border: '1.5px solid #D1DCD6',
                    cursor: 'not-allowed',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }
                : {
                    padding: '10px 14px',
                    fontSize: '0.85rem',
                  }
            }
          >
            <ShoppingCart size={16} weight="bold" />
            <span>{isOutOfStock ? 'Out of Stock' : 'Add to Bag'}</span>
          </button>

          <Link
            to={`/products/${product.id}`}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FAF9F4',
              border: '1.5px solid var(--color-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-green)',
              boxShadow: '1px 1px 0px var(--color-pink)',
              transition: 'all 0.15s ease',
              textDecoration: 'none',
            }}
            title="View Product Details"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-green-pale)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF9F4';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Eye size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
