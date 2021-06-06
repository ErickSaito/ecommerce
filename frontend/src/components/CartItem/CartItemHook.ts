import { ICartSku } from '@ericksaito/ecommerce/cart_sku/Types';
import { message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import CartClient from '../../client/CartClient';
import { CartContext } from '../../context/CartContext';

const useCartItem = (cartSku: ICartSku) => {
  const [quantity, _setQuantity] = useState<number>(cartSku.qty ?? 0);

  const { loadCart } = useContext(CartContext);

  useEffect(() => {
    _setQuantity(cartSku.qty ?? 0);
  }, [cartSku]);

  async function setQuantity(qty: number) {
    if (qty > 0) {
      _setQuantity(qty);
      const { error } = await CartClient.updateProduct(
        cartSku.cart_key,
        cartSku.key,
        {
          ...cartSku,
          qty,
        }
      );

      if (error) {
        message.error(
          error.message ?? 'Não conseguimos adicionar o produto na sacola :('
        );
      }
    } else {
      await CartClient.removeProduct(cartSku.cart_key, cartSku.key);
    }
    await loadCart(cartSku.cart_key);
  }

  async function removeItem() {
    await CartClient.removeProduct(cartSku.cart_key, cartSku.key);
    await loadCart(cartSku.cart_key);
  }

  return {
    quantity,
    setQuantity,
    removeItem,
  };
};

export default useCartItem;
