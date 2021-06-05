import * as React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';

const ProductList: React.FC = () => {
  return (
    <div className={styles.productList}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default ProductList;
