import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const useCartList = () => {
  const { cart } = useContext(CartContext);
  const { cartSkus } = cart!;

  return {
    cartSkus,
  };
};

export default useCartList;
