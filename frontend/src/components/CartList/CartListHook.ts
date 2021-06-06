import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';

const useCartList = () => {
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState<number | undefined>(0);

  useEffect(() => {
    setTotal(
      cart?.cartSkus
        ?.map((c) => c.qty * c.sku.price)
        .reduce((acc, curr) => acc + curr, 0)
    );
  }, [cart]);

  return {
    cartSkus: cart?.cartSkus,
    total,
    setTotal,
  };
};

export default useCartList;
