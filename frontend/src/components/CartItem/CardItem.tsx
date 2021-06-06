import { Button, Col, Row } from 'antd';
import React from 'react';
import test from '../../assets/test.png';
import { formatPrice } from '../Utils';
import styles from './CardItem.module.scss';

const CartItem: React.FC = () => {
  return (
    <div className={styles.cardItem}>
      <Row gutter={16}>
        <Col span={4}>
          <img src={test} alt="test" width="60" />
        </Col>
        <Col span={16}>
          <Row className={styles.title}>
            <Col flex={2}>
              <span>Title</span>
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
              >
                +
              </Button>
            </Col>
            <Col flex="20px">
              <span>10</span>
            </Col>
            <Col flex="20px">
              <Button
                size="small"
                type="primary"
                className={styles.changeQtyButton}
              >
                -
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
