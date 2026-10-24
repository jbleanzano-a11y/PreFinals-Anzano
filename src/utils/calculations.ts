import type { Product, CartItem, StockStatus, InventoryStats } from '../types/product';

/**
 * Computes individual product subtotal: Price × Quantity
 */
export function computeSubtotal(price: number, quantity: number): number {
  const safePrice = Number(price) || 0;
  const safeQty = Number(quantity) || 0;
  return safePrice * Math.max(0, safeQty);
}

/**
 * Computes overall inventory value: Sum of all product subtotals
 * Preserves the exact formula and .reduce() method requested in the exam PDF.
 */
export function computeOverallTotal(products: Product[]): number {
  return products.reduce(
    (total, product) => total + (Number(product.price) || 0) * (Number(product.quantity) || 0),
    0
  );
}

/**
 * Computes the total quantity of all inventory products
 */
export function computeTotalQuantity(products: Product[]): number {
  return products.reduce((total, p) => total + (Number(p.quantity) || 0), 0);
}

/**
 * Computes cart grand total
 */
export function computeCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce(
    (total, item) => total + (Number(item.product.price) || 0) * (Number(item.cartQuantity) || 0),
    0
  );
}

/**
 * Total number of units in cart
 */
export function computeCartItemsCount(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.cartQuantity, 0);
}

/**
 * Determines stock condition:
 * - IN_STOCK: Quantity >= 5
 * - LOW_STOCK: Quantity between 1 and 4
 * - OUT_OF_STOCK: Quantity is 0
 */
export function getStockStatus(quantity: number): StockStatus {
  const qty = Number(quantity) || 0;
  if (qty <= 0) return 'OUT_OF_STOCK';
  if (qty < 5) return 'LOW_STOCK';
  return 'IN_STOCK';
}

/**
 * Returns human-readable label for stock status
 */
export function getStockStatusLabel(status: StockStatus): string {
  switch (status) {
    case 'IN_STOCK':
      return 'In Stock';
    case 'LOW_STOCK':
      return 'Low Stock (< 5 left)';
    case 'OUT_OF_STOCK':
      return 'Out of Stock';
  }
}

/**
 * Aggregates all inventory statistics for dashboard cards
 */
export function computeInventoryStats(products: Product[], cartItems: CartItem[]): InventoryStats {
  const totalProducts = products.length;
  const totalQuantity = computeTotalQuantity(products);
  const inventoryValue = computeOverallTotal(products);

  let lowStockCount = 0;
  let outOfStockCount = 0;
  let inStockCount = 0;

  for (const p of products) {
    const status = getStockStatus(p.quantity);
    if (status === 'LOW_STOCK') lowStockCount++;
    else if (status === 'OUT_OF_STOCK') outOfStockCount++;
    else inStockCount++;
  }

  const cartItemsCount = computeCartItemsCount(cartItems);

  return {
    totalProducts,
    totalQuantity,
    inventoryValue,
    lowStockCount,
    outOfStockCount,
    inStockCount,
    cartItemsCount,
  };
}

