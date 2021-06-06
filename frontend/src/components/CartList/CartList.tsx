import { Col, Empty, Row } from 'antd';
import * as React from 'react';
import CartItem from '../CartItem/CartItem';
import { formatPrice } from '../Utils';
import styles from './CartList.module.scss';
import useCartList from './CartListHook';

const CartList: React.FC = () => {
  const { cartSkus, total } = useCartList();

  return (
    <div className={styles.cartList}>
      {!cartSkus?.length && (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="ops! sua sacola ainda está vazia."
        />
      )}
      {!!cartSkus?.length && (
        <>
          <Row>
            <span className={styles.listText}>Sua sacola</span>
          </Row>
          {cartSkus?.map((c) => {
            return <CartItem cartSku={c} />;
          })}
          <Row className={styles.total} justify="space-between">
            <Col>
              <span className={styles.listText}>Total</span>
            </Col>
            <Col>
              <span className={styles.listText}>{formatPrice(total)}</span>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CartList;
