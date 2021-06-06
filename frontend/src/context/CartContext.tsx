import { ICart } from '@ericksaito/ecommerce/cart/Types';
import * as React from 'react';

export interface ICartContext {
  cart?: Partial<ICart>;
  isLoading: boolean;
  loadCart: (key?: string) => Promise<void>;
}

export const CART_CONTEXT_DEFAULT = {
  cart: undefined,
  isLoading: false,
  loadCart: () => Promise.resolve(),
};

export const CartContext =
  React.createContext<ICartContext>(CART_CONTEXT_DEFAULT);
