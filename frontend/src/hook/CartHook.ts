import { ICart } from '@ericksaito/ecommerce/cart/Types';
import { useState } from 'react';
import CartClient from '../client/CartClient';

const useCart = () => {
  const [cart, setCart] = useState<ICart | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadCart(key?: string) {
    setIsLoading(true);
    const { data } = await CartClient.findByKey(key);
    setCart(data);
    setIsLoading(false);
  }

  return {
    isLoading,
    cart,
    loadCart,
  };
};

export default useCart;
