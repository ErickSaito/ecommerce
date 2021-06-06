import { ISku } from '@ericksaito/ecommerce/sku/Types';
import { useEffect, useState } from 'react';
import SkuClient from '../../client/SkuClient';

const useProductList = () => {
  const [products, setProducts] = useState<ISku[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setIsLoading(true);
    const { results } = await SkuClient.findAll();
    setProducts(results);
    setIsLoading(false);
  }

  return {
    isLoading,
    products,
  };
};

export default useProductList;
