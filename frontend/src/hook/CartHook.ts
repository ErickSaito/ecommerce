import { ICart } from '@ericksaito/ecommerce/cart/Types';
import { useCallback, useState } from 'react';
import CartClient from '../client/CartClient';

const useCart = (key?: string) => {
  const [cart, setCart] = useState<ICart>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadCart = useCallback(async () => {
    setIsLoading(true);
    if (!cart) {
      const { data } = await CartClient.findByKey(key);
      setCart(data);
    }
    setIsLoading(false);
  }, [key, cart]);

  return {
    isLoading,
    cart,
    loadCart,
  };
};

export default useCart;
