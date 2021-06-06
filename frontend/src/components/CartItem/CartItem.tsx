import { ICartSku } from '@ericksaito/ecommerce/cart_sku/Types';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { formatPrice } from '../Utils';
import styles from './CartItem.module.scss';
import useCartItem from './CartItemHook';

interface ICartItem {
  cartSku: ICartSku;
}

const CartItem: React.FC<ICartItem> = ({ cartSku }) => {
  const { quantity, setQuantity, removeItem } = useCartItem(cartSku);
  const { sku } = cartSku;

  return (
    <div className={styles.cardItem}>
      <Row gutter={16}>
        <Col span={4}>
          <img src={sku?.product?.image} alt={sku?.product?.name} width="60" />
        </Col>
        <Col span={16}>
          <Row justify="space-between" className={styles.title}>
            <Col>
              <span>{sku?.product?.name}</span>
            </Col>
            <Col>
              <Button
                size="small"
                type="primary"
                className={styles.removeButton}
                onClick={removeItem}
              >
                x
              </Button>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col flex="20px">
              <Button
                size="small"
                type="primary"
                className={styles.changeQtyButton}
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                -
              </Button>
            </Col>
            <Col flex="20px">
              <span>{quantity}</span>
            </Col>
            <Col flex="20px">
              <Button
                size="small"
                type="primary"
                className={styles.changeQtyButton}
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </Col>
            <Col>
              <span>{formatPrice(sku.price * quantity)}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
