import { message } from 'antd';
import { useContext } from 'react';
import CartClient from '../../client/CartClient';
import { CartContext } from '../../context/CartContext';

const useProductCard = (sku_key: string) => {
  const { cart, loadCart } = useContext(CartContext);

  async function addProduct() {
    const { error } = await CartClient.addProduct(cart?.key!, {
      sku_key: sku_key,
    });

    if (error) {
      message.error(
        error.message ?? 'Não conseguimos adicionar o produto na sacola :('
      );
    }
    await loadCart(cart?.key);
  }

  return {
    addProduct,
  };
};

export default useProductCard;
