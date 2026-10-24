import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { formatCurrency } from '../utils/currency';
import { computeSubtotal } from '../utils/calculations';
import { StockBadge } from '../components/ui/StockBadge';
import { RatingStars } from '../components/ui/RatingStars';
import { QuantityControl } from '../components/products/QuantityControl';
import { FloralSticker } from '../components/decorations/FloralSticker';
import { Sparkle } from '../components/decorations/Sparkle';
import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  Tag,
} from '@phosphor-icons/react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, increaseQuantity, decreaseQuantity, addToCart } = useProducts();

  const product = getProductById(id || '');

  // Local state for how many units to add to cart
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '2px solid var(--color-green)',
            padding: '40px 24px',
            boxShadow: '4px 4px 0px var(--color-pink)',
          }}
        >
          <FloralSticker size={64} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-green)', marginTop: '16px' }}>
            Product Not Found
          </h2>
          <p style={{ color: 'var(--color-text-muted)', margin: '12px 0 24px' }}>
            The item you are searching for does not exist or has been removed from the inventory.
          </p>
          <Link to="/products" className="btn-primary">
            <ArrowLeft size={18} weight="bold" />
            <span>Return to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = computeSubtotal(product.price, product.quantity);
  const isOutOfStock = product.quantity <= 0;

  return (
    <div className="container" style={{ paddingTop: '32px', paddingBottom: '70px' }}>
      {/* Back Button & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="btn-secondary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to Products</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          <span>/</span>
          <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Products</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>{product.category}</span>
        </div>
      </div>

      {/* Main Boutique Product Layout */}
      <div
        className="product-detail-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.15fr)',
          gap: '48px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Scalloped Image Frame & Boutique Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '32px',
              border: '2.5px solid var(--color-green)',
              boxShadow: '6px 6px 0px var(--color-pink)',
              padding: '24px',
              position: 'relative',
            }}
          >
            {/* Scalloped Image container */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                borderRadius: '24px',
                backgroundColor: 'var(--color-pink-soft)',
                overflow: 'hidden',
                border: '2px solid var(--color-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Floating decorative flower */}
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <FloralSticker size={42} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />
              </div>

              {/* Category pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  border: '1.5px solid var(--color-green)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  color: 'var(--color-green-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Tag size={14} weight="bold" color="#08734B" />
                <span>{product.category}</span>
              </div>
            </div>

            {/* Micro details bar below photo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px dashed rgba(8, 115, 75, 0.2)',
              }}
            >
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Product ID: <strong>{product.id}</strong>
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="var(--color-green)" weight="bold" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-green-dark)' }}>
                  Verified BloomStock Standard
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Detailed Product Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Category script accent */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.8rem',
                color: 'var(--color-pink-muted)',
                lineHeight: 1,
              }}
            >
              {product.category}
            </span>
            <Sparkle size={14} color="#08734B" />
          </div>

          {/* Product Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              color: 'var(--color-green)',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            {product.name}
          </h1>

          {/* Rating & Stock Status */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
              flexWrap: 'wrap',
            }}
          >
            <RatingStars rating={product.rating} size={20} />
            <StockBadge quantity={product.quantity} size="md" />
          </div>

          {/* Price & Subtotal Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid var(--color-green)',
              padding: '18px 24px',
              boxShadow: '3px 3px 0px rgba(8, 115, 75, 0.08)',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                  Unit Retail Price
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    color: 'var(--color-green)',
                    lineHeight: 1.1,
                  }}
                >
                  {formatCurrency(product.price)}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                  Inventory Stock Subtotal:
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: 'var(--color-green-dark)',
                  }}
                >
                  {formatCurrency(subtotal)}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  ({product.quantity} units in storage)
                </span>
              </div>
            </div>

            {/* Inventory Quantity Adjuster (PDF Requirement) */}
            <div
              style={{
                borderTop: '1px dashed rgba(8, 115, 75, 0.2)',
                paddingTop: '12px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                Adjust Inventory Stock:
              </span>
              <QuantityControl
                quantity={product.quantity}
                onIncrease={() => increaseQuantity(product.id)}
                onDecrease={() => decreaseQuantity(product.id)}
                min={0}
                size="md"
              />
            </div>
          </div>

          {/* Description Section */}
          <div style={{ marginBottom: '22px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-green)',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkle size={14} color="#F4A0C6" />
              Product Description
            </h3>
            <p
              style={{
                fontSize: '0.96rem',
                color: 'var(--color-text-dark)',
                lineHeight: 1.7,
              }}
            >
              {product.description}
            </p>
          </div>

          {/* Specifications Section */}
          <div
            style={{
              backgroundColor: '#FAF9F4',
              borderRadius: '16px',
              border: '1px solid var(--color-green-sage)',
              padding: '16px 20px',
              marginBottom: '26px',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.98rem',
                color: 'var(--color-green-dark)',
                marginBottom: '6px',
              }}
            >
              Product Specifications
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              {product.specifications}
            </p>
          </div>

          {/* Purchase Actions (Add to Cart) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                Bag Qty:
              </span>
              <QuantityControl
                quantity={purchaseQuantity}
                onIncrease={() => setPurchaseQuantity((prev) => prev + 1)}
                onDecrease={() => setPurchaseQuantity((prev) => Math.max(1, prev - 1))}
                min={1}
                disabled={isOutOfStock}
                size="md"
              />
            </div>

            <button
              type="button"
              onClick={() => addToCart(product, purchaseQuantity)}
              disabled={isOutOfStock}
              className={isOutOfStock ? '' : 'btn-primary'}
              style={
                isOutOfStock
                  ? {
                      flex: 1,
                      padding: '14px 24px',
                      borderRadius: '9999px',
                      backgroundColor: '#E8EAE5',
                      color: '#89A89C',
                      border: '1.5px solid #D1DCD6',
                      cursor: 'not-allowed',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }
                  : {
                      flex: 1,
                      padding: '14px 28px',
                      fontSize: '1rem',
                    }
              }
            >
              <ShoppingCart size={20} weight="bold" />
              <span>{isOutOfStock ? 'Currently Out of Stock' : `Add ${purchaseQuantity} to Shopping Bag`}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
