import { Col, Row } from 'antd';
import * as React from 'react';
import CartList from '../CartList/CartList';
import ProductList from '../ProductList/ProductList';

export const PageMain: React.FC = () => {
  return (
    <Row gutter={8}>
      <Col span={12}>
        <ProductList />
      </Col>
      <Col span={12}>
        <CartList />
      </Col>
    </Row>
  );
};
