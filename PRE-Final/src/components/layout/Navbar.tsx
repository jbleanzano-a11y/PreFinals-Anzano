import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import {
  House,
  Package,
  PlusCircle,
  ShoppingCart,
  List,
  X,
} from '@phosphor-icons/react';
import { FloralSticker } from '../decorations/FloralSticker';
import { Sparkle } from '../decorations/Sparkle';
import { CountryClubTopBar } from '../decorations/DecorativeDivider';

export const Navbar: React.FC = () => {
  const { stats } = useProducts();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: <House size={18} weight="bold" /> },
    { to: '/products', label: 'Products', icon: <Package size={18} weight="bold" /> },
    { to: '/add-product', label: 'Add Product', icon: <PlusCircle size={18} weight="bold" /> },
    {
      to: '/cart',
      label: 'Cart',
      icon: <ShoppingCart size={18} weight="bold" />,
      badge: stats.cartItemsCount,
    },
  ];

  return (
    <>
      <CountryClubTopBar />
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#FAF9F4',
          borderBottom: '2px solid var(--color-green)',
          boxShadow: '0 4px 16px rgba(8, 115, 75, 0.06)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: '2px solid var(--color-green)',
                boxShadow: '2px 2px 0px var(--color-pink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(15deg) scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1)')}
            >
              <FloralSticker size={32} petalColor="#F4A0C6" centerColor="#08734B" />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '2.1rem',
                  lineHeight: 0.95,
                  color: 'var(--color-green)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                BloomStock
                <Sparkle size={14} color="#F4A0C6" />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                }}
              >
                Your Lovely Inventory Space
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '9px 18px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  position: 'relative',
                  color: isActive ? '#ffffff' : 'var(--color-green)',
                  backgroundColor: isActive ? 'var(--color-green)' : 'transparent',
                  border: isActive ? '1.5px solid var(--color-green-dark)' : '1.5px solid transparent',
                  boxShadow: isActive ? '2px 2px 0px var(--color-pink)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                })}
              >
                {link.icon}
                <span>{link.label}</span>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: '#F4A0C6',
                      color: 'var(--color-green-dark)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '9999px',
                      border: '1px solid var(--color-green)',
                      marginLeft: '2px',
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/add-product"
              className="btn-pink"
              style={{
                marginLeft: '8px',
                padding: '9px 18px',
                fontSize: '0.88rem',
              }}
            >
              <PlusCircle size={16} weight="bold" />
              <span>New Item</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1.5px solid var(--color-green)',
              color: 'var(--color-green)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '2px 2px 0px var(--color-pink)',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            style={{
              backgroundColor: '#FAF9F4',
              borderTop: '1.5px dashed var(--color-green-sage)',
              padding: '16px 20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: isActive ? '#ffffff' : 'var(--color-green)',
                  backgroundColor: isActive ? 'var(--color-green)' : '#ffffff',
                  border: '1.5px solid var(--color-green)',
                  boxShadow: isActive ? '3px 3px 0px var(--color-pink)' : 'none',
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span
                    style={{
                      backgroundColor: '#F4A0C6',
                      color: 'var(--color-green-dark)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      border: '1px solid var(--color-green)',
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

