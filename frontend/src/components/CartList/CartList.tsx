import { Col, Row } from 'antd';
import * as React from 'react';
import CartItem from '../CartItem/CardItem';
import styles from './CartList.module.scss';

const CartList: React.FC = () => {
  return (
    <div className={styles.cartList}>
      <Row>
        <span>Sua sacola</span>
      </Row>
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <CartItem />
      <Row>
        <Col flex={4}>
          <span>Total</span>
        </Col>
        <Col flex="auto">
         <span>R$12</span>
        </Col>
      </Row>
    </div>
  );
};

export default CartList;
