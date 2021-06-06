import { ICartSku } from '@ericksaito/ecommerce/cart_sku/Types';
import { Button, Col, Row } from 'antd';
import React from 'react';
import test from '../../assets/test.png';
import { formatPrice } from '../Utils';
import styles from './CartItem.module.scss';
import useCartItem from './CartItemHook';

interface ICartItem {
  cartSku: ICartSku;
}

const CartItem: React.FC<ICartItem> = ({ cartSku }) => {
  const { quantity, setQuantity } = useCartItem(cartSku);
  const { sku } = cartSku;

  return (
    <div className={styles.cardItem}>
      <Row gutter={16}>
        <Col span={4}>
          <img src={sku?.product?.image} alt={sku?.product?.name} width="60" />
        </Col>
        <Col span={16}>
          <Row className={styles.title}>
            <Col flex={2}>
              <span>{sku?.product?.name}</span>
            </Col>
            <Col flex="auto">
              <Button
                size="small"
                type="primary"
                className={styles.removeButton}
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
              <span>{formatPrice(1000)}</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
