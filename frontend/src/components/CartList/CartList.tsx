import { Col, Row } from 'antd';
import * as React from 'react';
import CartItem from '../CartItem/CardItem';
import { formatPrice } from '../Utils';
import styles from './CartList.module.scss';

const CartList: React.FC = () => {
  return (
    <div className={styles.cartList}>
      <Row>
        <span className={styles.listText}>Sua sacola</span>
      </Row>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <Row>
        <Col flex={1}>
          <span className={styles.listText}>Total</span>
        </Col>
        <Col flex="auto">
          <span className={styles.listText}>{formatPrice(1000)}</span>
        </Col>
      </Row>
    </div>
  );
};

export default CartList;
