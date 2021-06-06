import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const useCartList = () => {
  const { cart } = useContext(CartContext);

  const total = cart?.cartSkus?.map((c) => c.qty * c.sku.price).reduce((acc, curr) => acc + curr);

  return {
    cartSkus: cart?.cartSkus,
    total
  };
};

export default useCartList;
