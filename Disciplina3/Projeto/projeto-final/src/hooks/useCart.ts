import { useContext } from 'react';
import { CartContext, CartContextType } from '../contexts/CartContext';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser utilizado dentro de um CartProvider');
  }
  return context;
};

export default useCart;
