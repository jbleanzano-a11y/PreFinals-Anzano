export type ProductCategory =
  | 'All Products'
  | 'Electronics'
  | 'Accessories'
  | 'Home Essentials'
  | 'Office Supplies'
  | 'Other';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  specifications: string;
  rating: number;
  createdAt?: string;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  cartQuantity: number;
}

export type StockStatus = 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';

export interface InventoryStats {
  totalProducts: number;
  totalQuantity: number;
  inventoryValue: number;
  lowStockCount: number;
  outOfStockCount: number;
  inStockCount: number;
  cartItemsCount: number;
}

