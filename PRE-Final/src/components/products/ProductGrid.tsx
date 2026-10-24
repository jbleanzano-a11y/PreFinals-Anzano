import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { formatCurrency } from '../../utils/currency';
import { computeSubtotal } from '../../utils/calculations';
import { StockBadge } from '../ui/StockBadge';
import { QuantityControl } from './QuantityControl';
import { useProducts } from '../../context/ProductContext';
import { ShoppingCart, Eye, Trash, Sparkle as PhosphorSparkle } from '@phosphor-icons/react';
import { FloralSticker } from '../decorations/FloralSticker';

interface ProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'table';
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode = 'grid' }) => {
  const { increaseQuantity, decreaseQuantity, addToCart, deleteProduct } = useProducts();

  if (products.length === 0) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1.5px dashed var(--color-green-sage)',
          padding: '60px 20px',
          textAlign: 'center',
          maxWidth: '560px',
          margin: '40px auto',
        }}
      >
        <FloralSticker size={64} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.6rem',
            color: 'var(--color-green)',
            marginTop: '16px',
            marginBottom: '8px',
          }}
        >
          No Lovely Items Found
        </h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
          We could not find any products matching your selected search keywords or category filters.
        </p>
        <Link to="/add-product" className="btn-primary">
          <PhosphorSparkle size={18} weight="bold" />
          <span>Add a New Product</span>
        </Link>
      </div>
    );
  }

  if (viewMode === 'table') {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1.5px solid var(--color-green)',
          boxShadow: '4px 4px 0px rgba(8, 115, 75, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: '#FAF9F4',
                  borderBottom: '2px solid var(--color-green)',
                }}
              >
                <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)' }}>
                  Product
                </th>
                <th style={{ padding: '16px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)' }}>
                  Category
                </th>
                <th style={{ padding: '16px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)' }}>
                  Unit Price
                </th>
                <th style={{ padding: '16px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)' }}>
                  Quantity
                </th>
                <th style={{ padding: '16px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)' }}>
                  Subtotal
                </th>
                <th style={{ padding: '16px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)' }}>
                  Stock Status
                </th>
                <th style={{ padding: '16px 20px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-green-dark)', textAlign: 'right' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => {
                const subtotal = computeSubtotal(product.price, product.quantity);
                const isOutOfStock = product.quantity <= 0;

                return (
                  <tr
                    key={product.id}
                    style={{
                      borderBottom: '1px solid rgba(8, 115, 75, 0.12)',
                      backgroundColor: idx % 2 === 1 ? '#FAF9F4' : '#FFFFFF',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {/* Image + Title */}
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '54px',
                            height: '54px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: '1.5px solid var(--color-green)',
                            backgroundColor: 'var(--color-pink-soft)',
                          }}
                        />
                        <div>
                          <Link
                            to={`/products/${product.id}`}
                            style={{
                              fontFamily: 'var(--font-serif)',
                              fontWeight: 700,
                              fontSize: '0.98rem',
                              color: 'var(--color-green-dark)',
                              textDecoration: 'none',
                              display: 'block',
                            }}
                          >
                            {product.name}
                          </Link>
                          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            ID: {product.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td style={{ padding: '14px' }}>
                      <span className="boutique-tag" style={{ fontSize: '0.7rem' }}>
                        {product.category}
                      </span>
                    </td>

                    {/* Unit Price */}
                    <td style={{ padding: '14px', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--color-text-dark)' }}>
                      {formatCurrency(product.price)}
                    </td>

                    {/* Quantity with Controls */}
                    <td style={{ padding: '14px' }}>
                      <QuantityControl
                        quantity={product.quantity}
                        onIncrease={() => increaseQuantity(product.id)}
                        onDecrease={() => decreaseQuantity(product.id)}
                        min={0}
                        size="sm"
                      />
                    </td>

                    {/* Subtotal (Computed Price * Quantity) */}
                    <td style={{ padding: '14px', fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-green)' }}>
                      {formatCurrency(subtotal)}
                    </td>

                    {/* Stock Status Badge */}
                    <td style={{ padding: '14px' }}>
                      <StockBadge quantity={product.quantity} size="sm" />
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          disabled={isOutOfStock}
                          title={isOutOfStock ? 'Out of Stock' : 'Add to Shopping Bag'}
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            backgroundColor: isOutOfStock ? '#E8EAE5' : 'var(--color-green)',
                            border: '1px solid var(--color-green-dark)',
                            color: isOutOfStock ? '#89A89C' : '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                            boxShadow: isOutOfStock ? 'none' : '1px 1px 0px var(--color-pink)',
                          }}
                        >
                          <ShoppingCart size={16} weight="bold" />
                        </button>

                        <Link
                          to={`/products/${product.id}`}
                          title="View Details"
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            backgroundColor: '#FAF9F4',
                            border: '1px solid var(--color-green)',
                            color: 'var(--color-green)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                          }}
                        >
                          <Eye size={16} weight="bold" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          title="Delete Product"
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            backgroundColor: '#FAF9F4',
                            border: '1px solid #DC2626',
                            color: '#DC2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-grid-main"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '26px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
