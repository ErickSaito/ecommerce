import { ICartSku } from '@ericksaito/ecommerce/cart_sku/Types';
import { useState } from 'react';

const useCartItem = (cartSku: ICartSku) => {
  const [quantity, _setQuantity] = useState<number>(cartSku.qty ?? 0);

  async function setQuantity(qty: number) {
    if (qty >= 0) {
      _setQuantity(qty);
    }
  }

  return {
    quantity,
    setQuantity,
  };
};

export default useCartItem;
