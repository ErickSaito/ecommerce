import { ISku } from '@ericksaito/ecommerce/sku/Types';
import { Button, Card } from 'antd';
import React from 'react';
import styles from './ProductCard.module.scss';
import { formatPrice } from '../Utils';
import useProductCard from './ProductCardHook';

interface IProductCard {
  sku: ISku;
}

const ProductCard: React.FC<IProductCard> = ({ sku }) => {
  const { product } = sku;

  const { addProduct } = useProductCard(sku.key);

  return (
    <Card
      className={styles.productCard}
      size="small"
      cover={<img alt={product.name} src={product.image} />}
      actions={[
        <Button
          className={styles.buyButton}
          type="primary"
          onClick={addProduct}
        >
          Comprar
        </Button>,
      ]}
    >
      <Card.Meta title={product.name} />
      <p className={styles.price}>{formatPrice(sku.price)}</p>
    </Card>
  );
};

export default ProductCard;
