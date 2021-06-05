import React from 'react';
import test from '../../assets/test.png';
import { Button, Input, Row, Col } from 'antd';
import styles from './CardItem.module.scss';

const CartItem: React.FC = () => {
  return (
    <div className={styles.cardItem}>
      <Row gutter={16}>
        <Col span={4}>
          <img src={test} alt="test" width="50" />
        </Col>
        <Col span={16}>
          <Row className={styles.title}>
            <Col flex={4}>
              <span>Title</span>
            </Col>
            <Col flex="auto">
              <Button size="small" type="primary">
                x
              </Button>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col flex="20px">
              <Button size="small" type="primary">
                +
              </Button>
            </Col>
            <Col flex="60px">
              <Input size="small" bordered={false}/>
            </Col>
            <Col flex="20px">
              <Button size="small" type="primary">
                -
              </Button>
            </Col>
            <span>Preco</span>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
