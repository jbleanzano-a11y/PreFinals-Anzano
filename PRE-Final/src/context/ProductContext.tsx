import React, { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Product, CartItem, InventoryStats } from '../types/product';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { computeInventoryStats } from '../utils/calculations';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  stats: InventoryStats;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  hideToast: () => void;
  addProduct: (productData: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  increaseQuantity: (id: string, step?: number) => void;
  decreaseQuantity: (id: string, step?: number) => void;
  addToCart: (product: Product, quantityToAdd?: number) => void;
  updateCartQuantity: (productId: string, newQty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  resetToDefaults: () => void;
  getProductById: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY_PRODUCTS = 'bloomstock_products_v1';
const STORAGE_KEY_CART = 'bloomstock_cart_v1';

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEY_PRODUCTS, DEFAULT_PRODUCTS);
  const [cart, setCart] = useLocalStorage<CartItem[]>(STORAGE_KEY_CART, []);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const stats = useMemo(() => {
    return computeInventoryStats(products, cart);
  }, [products, cart]);

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.name}" added successfully to your lovely inventory!`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    // Also update product reference in cart if present
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === id
          ? { ...item, product: { ...item.product, ...updatedFields } }
          : item
      )
    );
    showToast('Product updated successfully', 'info');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast(`"${target?.name || 'Item'}" removed from inventory`, 'info');
  };

  /**
   * Increase inventory stock by 1 or specified step
   */
  const increaseQuantity = (id: string, step = 1) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newQty = (Number(p.quantity) || 0) + step;
          return { ...p, quantity: newQty };
        }
        return p;
      })
    );
  };

  /**
   * Decrease inventory stock by 1 or specified step (prevents negative values)
   */
  const decreaseQuantity = (id: string, step = 1) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const currentQty = Number(p.quantity) || 0;
          const newQty = Math.max(0, currentQty - step);
          return { ...p, quantity: newQty };
        }
        return p;
      })
    );
  };

  /**
   * Add a product to the shopping cart
   */
  const addToCart = (product: Product, quantityToAdd = 1) => {
    const freshProduct = products.find((p) => p.id === product.id) || product;

    if (freshProduct.quantity <= 0) {
      showToast(`Sorry, "${freshProduct.name}" is currently Out of Stock!`, 'warning');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === freshProduct.id);
      if (existing) {
        const nextQty = existing.cartQuantity + quantityToAdd;
        return prevCart.map((item) =>
          item.product.id === freshProduct.id ? { ...item, cartQuantity: nextQty } : item
        );
      } else {
        return [...prevCart, { product: freshProduct, cartQuantity: quantityToAdd }];
      }
    });

    showToast(`Added ${quantityToAdd}x "${freshProduct.name}" to your lovely bag! 🌸`, 'success');
  };

  const updateCartQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, cartQuantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from bag`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    showToast('Shopping bag cleared', 'info');
  };

  const resetToDefaults = () => {
    setProducts(DEFAULT_PRODUCTS);
    setCart([]);
    showToast('Reset inventory to default boutique collection!', 'success');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        stats,
        toast,
        showToast,
        hideToast,
        addProduct,
        updateProduct,
        deleteProduct,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        resetToDefaults,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
