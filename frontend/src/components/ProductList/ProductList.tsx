import * as React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import useProductList from './ProductListHook';

const ProductList: React.FC = () => {
  const { products } = useProductList();
  return (
    <div className={styles.productList}>
      <ul className={styles.list}>
        {products?.map((p) => {
          return (
            <li>
              <ProductCard sku={p} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
