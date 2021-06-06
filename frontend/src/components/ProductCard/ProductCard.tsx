import React from 'react';
import { Card, Avatar } from 'antd';

const ProductCard: React.FC = () => {
  return (
    <Card
      size="small"
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Card.Meta title="Card title" description="This is the description" />
    </Card>
  );
};

export default ProductCard;
