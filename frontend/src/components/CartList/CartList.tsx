import { Col, Row } from 'antd';
import * as React from 'react';
import CartItem from '../CartItem/CartItem';
import { formatPrice } from '../Utils';
import styles from './CartList.module.scss';
import useCartList from './CartListHook';

const CartList: React.FC = () => {
  const { cartSkus } = useCartList();

  return (
    <div className={styles.cartList}>
      <Row>
        <span className={styles.listText}>Sua sacola</span>
      </Row>
      {cartSkus?.map((c) => {
        return <CartItem cartSku={c} />;
      })}
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
