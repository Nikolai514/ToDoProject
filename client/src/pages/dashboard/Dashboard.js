import React from 'react';
import TodoList from './TodoList';
import Search from './Search';
import { Row, Col } from 'antd'

import PageSize from './PageSize';

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <PageSize />
        </Col>
        <Col xs={24} sm={24} md={22} lg={22} xl={22}>
          <Search />
        </Col>
      </Row>
      <TodoList />
    </>
  );
};

export default Dashboard;
