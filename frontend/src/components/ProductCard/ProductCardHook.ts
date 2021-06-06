import { useContext } from 'react';
import CartClient from '../../client/CartClient';
import { CartContext } from '../../context/CartContext';

const useProductCard = (sku_key: string) => {
  const { cart, loadCart } = useContext(CartContext);

  async function addProduct() {
    await CartClient.addProduct(cart?.key!, {
      sku_key: sku_key,
    });

    loadCart(cart?.key);
  }

  return {
    addProduct
  }
};

export default useProductCard;
