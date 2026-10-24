import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { formatCurrency } from '../utils/currency';
import { StatCard } from '../components/ui/StatCard';
import { ProductCard } from '../components/products/ProductCard';
import { FloralSticker } from '../components/decorations/FloralSticker';
import { Sparkle } from '../components/decorations/Sparkle';
import { ScallopedBadge } from '../components/decorations/ScallopedBadge';
import { DecorativeDivider } from '../components/decorations/DecorativeDivider';
import {
  Package,
  CurrencyCircleDollar,
  WarningOctagon,
  ShoppingCart,
  ArrowRight,
  PlusCircle,
  CheckCircle,
  Tag,
  Lightning,
} from '@phosphor-icons/react';

export const Home: React.FC = () => {
  const { products, stats } = useProducts();
  const featuredProducts = products.filter((p) => p.isFeatured || p.rating >= 4.8).slice(0, 3);

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* BOUTIQUE EDITORIAL HERO SECTION */}
      <section
        style={{
          padding: '48px 0 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            className="hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid var(--color-green)',
                  borderRadius: '9999px',
                  padding: '5px 14px',
                  boxShadow: '2px 2px 0px var(--color-pink)',
                  marginBottom: '16px',
                }}
              >
                <Sparkle size={12} color="#F4A0C6" />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-green-dark)',
                  }}
                >
                  Pastel Preppy Inventory Management
                </span>
                <Sparkle size={12} color="#F4A0C6" />
              </div>

              {/* Large Elegant Script Heading */}
              <h1
                className="hero-script-title"
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: ' clamp(3.2rem, 7vw, 5.2rem)',
                  color: 'var(--color-green)',
                  lineHeight: 1.02,
                  marginBottom: '10px',
                  textShadow: '2px 2px 0px rgba(244, 160, 198, 0.4)',
                }}
              >
                Welcome to BloomStock
              </h1>

              {/* Bold Serif Subtitle */}
              <h2
                className="hero-serif-title"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--color-green-dark)',
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                }}
              >
                Organize Your Products Beautifully
              </h2>

              {/* Hero Description */}
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.65,
                  maxWidth: '540px',
                  marginBottom: '28px',
                }}
              >
                A charming and simple space to manage products, track inventory, compute real-time subtotals, and keep everything organized with boutique elegance.
              </p>

              {/* Primary Actions */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '14px',
                  alignItems: 'center',
                }}
              >
                <Link to="/products" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                  <Package size={20} weight="bold" />
                  <span>Browse Products</span>
                  <ArrowRight size={18} weight="bold" />
                </Link>

                <Link to="/add-product" className="btn-secondary" style={{ padding: '13px 26px', fontSize: '1rem' }}>
                  <PlusCircle size={20} weight="bold" />
                  <span>Add New Product</span>
                </Link>
              </div>

              {/* Preppy perks row */}
              <div
                className="hero-badges-wrapper"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginTop: '32px',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-green-dark)' }}>
                  <CheckCircle size={16} weight="fill" color="#08734B" />
                  <span>Real-time PHP (₱) Totals</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-green-dark)' }}>
                  <CheckCircle size={16} weight="fill" color="#08734B" />
                  <span>Dynamic Stock Tracking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-green-dark)' }}>
                  <CheckCircle size={16} weight="fill" color="#08734B" />
                  <span>Local Storage Persistence</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Mockup: Scalloped frame inspired by reference image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Main Card with Scalloped frame and striped border */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '32px',
                  border: '2.5px solid var(--color-green)',
                  boxShadow: '8px 8px 0px var(--color-pink)',
                  padding: '20px',
                  position: 'relative',
                  width: '100%',
                  maxWidth: '440px',
                }}
              >
                {/* Top striped accent */}
                <div
                  className="preppy-stripes-pink-cream"
                  style={{
                    height: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-green)',
                    marginBottom: '16px',
                  }}
                />

                {/* Scalloped Hero Photograph Frame */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '280px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '2px solid var(--color-green)',
                    backgroundColor: 'var(--color-pink-soft)',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80"
                    alt="Featured Boutique Product"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Corner stamp badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      border: '1.5px solid var(--color-green)',
                      borderRadius: '9999px',
                      padding: '4px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--color-green-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Sparkle size={10} color="#F4A0C6" />
                    <span>NEWEST ARRIVALS</span>
                  </div>

                  {/* Pink Scalloped Label */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'var(--color-pink)',
                      color: 'var(--color-green-dark)',
                      border: '1.5px solid var(--color-green)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                    }}
                  >
                    Country Club Choice 🌸
                  </div>
                </div>

                {/* Card Sub-info */}
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 800 }}>
                      Featured Item
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-green)' }}>
                      Retro Bluetooth Speaker
                    </h4>
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      fontWeight: 800,
                      color: 'var(--color-green)',
                    }}
                  >
                    ₱3,450.00
                  </span>
                </div>
              </div>

              {/* Floating Flower & Stamp Badges (Inspired by reference mockup stickers) */}
              <div
                style={{
                  position: 'absolute',
                  top: '-24px',
                  right: '-16px',
                  zIndex: 2,
                }}
              >
                <FloralSticker
                  size={56}
                  petalColor="#F4A0C6"
                  centerColor="#08734B"
                  className="anim-float-slow"
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-16px',
                  zIndex: 2,
                }}
              >
                <ScallopedBadge
                  title="Bloom"
                  subtitle="EST. 2026"
                  size={92}
                  bg="#FFFFFF"
                  border="#08734B"
                  textColor="#08734B"
                  className="anim-float-delayed"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DASHBOARD OVERVIEW (MANDATORY INVENTORY STATISTICS) */}
      <section style={{ marginTop: '40px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="boutique-tag">Real-Time Inventory Overview</span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.1rem',
                color: 'var(--color-green)',
                marginTop: '6px',
              }}
            >
              Inventory Statistics & Health
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
              Calculated automatically using JavaScript <code>.reduce()</code> formulas.
            </p>
          </div>

          <div
            className="stats-grid-main"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: '20px',
            }}
          >
            {/* Stat 1: Total Products */}
            <StatCard
              label="Total Products"
              value={stats.totalProducts}
              subtitle={`${stats.totalQuantity} total inventory units`}
              icon={<Package size={20} weight="bold" />}
              accentColor="var(--color-green)"
            />

            {/* Stat 2: Overall Inventory Value */}
            <StatCard
              label="Inventory Value"
              value={formatCurrency(stats.inventoryValue)}
              subtitle="Sum of all product subtotals"
              icon={<CurrencyCircleDollar size={20} weight="bold" />}
              accentColor="var(--color-green)"
              isHighlight={true}
            />

            {/* Stat 3: Low Stock Alerts */}
            <StatCard
              label="Low Stock Items"
              value={stats.lowStockCount}
              subtitle={
                stats.lowStockCount > 0
                  ? 'Urgent: < 5 items in stock'
                  : 'All products well-stocked'
              }
              icon={<WarningOctagon size={20} weight="bold" />}
              accentColor={stats.lowStockCount > 0 ? '#D97706' : 'var(--color-green)'}
            />

            {/* Stat 4: Cart Items */}
            <StatCard
              label="Shopping Bag"
              value={stats.cartItemsCount}
              subtitle={`${stats.cartItemsCount} units in active bag`}
              icon={<ShoppingCart size={20} weight="bold" />}
              accentColor="#08734B"
            />
          </div>
        </div>
      </section>

      <DecorativeDivider label="Curated Boutique Selection" />

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <span className="boutique-tag">Hand-Picked Quality</span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: 'var(--color-green)',
                  marginTop: '4px',
                }}
              >
                Featured Products
              </h3>
            </div>

            <Link to="/products" className="btn-secondary">
              <span>View All Collection</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          <div
            className="product-grid-main"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '24px',
            }}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* PRE-FINAL EXAM OBJECTIVES ACCREDITATION BANNER */}
      <section style={{ marginTop: '54px' }}>
        <div className="container">
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              border: '2px solid var(--color-green)',
              boxShadow: '4px 4px 0px var(--color-pink)',
              padding: '36px 30px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-pink-soft)',
                  border: '1.5px solid var(--color-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green-dark)',
                  flexShrink: 0,
                }}
              >
                <Lightning size={20} weight="bold" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-green)' }}>
                  State Management
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Full dynamic reactivity powered by React 19 Hooks and context architecture.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-green-pale)',
                  border: '1.5px solid var(--color-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green)',
                  flexShrink: 0,
                }}
              >
                <CurrencyCircleDollar size={20} weight="bold" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-green)' }}>
                  Computed Totals
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Instant Subtotal (Price × Qty) and Overall Total calculation in Philippine Pesos.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFF2DF',
                  border: '1.5px solid #D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706',
                  flexShrink: 0,
                }}
              >
                <Tag size={20} weight="bold" />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-green)' }}>
                  Stock Indicators
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  Conditional formatting highlighting Low Stock (&lt; 5 units) and Out of Stock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
