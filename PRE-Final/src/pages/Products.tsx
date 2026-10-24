import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductFilters, type StockFilterOption, type SortOption } from '../components/products/ProductFilters';
import { ProductGrid } from '../components/products/ProductGrid';
import type { ProductCategory, Product } from '../types/product';
import { formatCurrency } from '../utils/currency';
import { computeOverallTotal, getStockStatus } from '../utils/calculations';
import { PlusCircle, ArrowClockwise } from '@phosphor-icons/react';
import { Sparkle } from '../components/decorations/Sparkle';
import { FloralSticker } from '../components/decorations/FloralSticker';

export const Products: React.FC = () => {
  const { products, resetToDefaults } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [stockFilter, setStockFilter] = useState<StockFilterOption>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const categories: ProductCategory[] = [
    'All Products',
    'Electronics',
    'Accessories',
    'Home Essentials',
    'Office Supplies',
    'Other',
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let list: Product[] = [...products];

    // Category filter
    if (selectedCategory !== 'All Products') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.specifications.toLowerCase().includes(term)
      );
    }

    // Stock condition filter
    if (stockFilter !== 'ALL') {
      list = list.filter((p) => getStockStatus(p.quantity) === stockFilter);
    }

    // Sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
        default:
          return (b.createdAt || '').localeCompare(a.createdAt || '');
      }
    });

    return list;
  }, [products, selectedCategory, searchTerm, stockFilter, sortBy]);

  const filteredTotalValue = useMemo(() => {
    return computeOverallTotal(filteredProducts);
  }, [filteredProducts]);

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '60px' }}>
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="boutique-tag">Boutique Collection</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Showing {filteredProducts.length} of {products.length} items
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
            Product Management
            <Sparkle size={18} color="#F4A0C6" />
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Filter by category, search items, adjust live quantities, and track stock subtotals.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={resetToDefaults}
            className="btn-secondary"
            title="Reload default boutique items"
            style={{ padding: '10px 16px', fontSize: '0.85rem' }}
          >
            <ArrowClockwise size={16} weight="bold" />
            <span className="hide-mobile">Reset Default Items</span>
          </button>

          <Link to="/add-product" className="btn-primary" style={{ padding: '11px 22px' }}>
            <PlusCircle size={18} weight="bold" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        stockFilter={stockFilter}
        onStockFilterChange={setStockFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        categories={categories}
      />

      {/* Overall Value Summary Ribbon for Filtered Results */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1.5px solid var(--color-green)',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          boxShadow: '2px 2px 0px rgba(8, 115, 75, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FloralSticker size={22} petalColor="#F4A0C6" centerColor="#08734B" />
          <span style={{ fontSize: '0.88rem', color: 'var(--color-text-dark)', fontWeight: 600 }}>
            Filtered Results Subtotal Value:
          </span>
          <strong
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              color: 'var(--color-green)',
            }}
          >
            {formatCurrency(filteredTotalValue)}
          </strong>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          PDF Requirement: Real-time <code>.reduce()</code> computation across all items
        </div>
      </div>

      {/* Main Product Grid or Table */}
      <ProductGrid products={filteredProducts} viewMode={viewMode} />
    </div>
  );
};
