import React, { useState, useEffect } from 'react';
import { Radio, Row, Col } from 'antd';

import Input from './../../atoms/Input';
import { useSearch, usePagination } from './../../redux/hooks';

const Search = () => {
  const { setSearchTerm, searchTerm, isActive } = useSearch();
  const { setPageReset } = usePagination();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setPageReset(true);
    setSearchTerm({search: search, filter: filter});
  }, [filter, search]);

  return (
    <Row justify="space-between" style={{ alignItems: "flex-end" }}>
      <Col xs={24} sm={24} md={24} lg={4} xl={4} className="form-group">
        <Input
          type="text"
          placeholder="search by tag"
          className="border-top-0 border-left-0 border-right-0"
          pClassName="mb-0 qwe"
          onChange={(e) => setSearch(e.target.value)}
          value={isActive ? searchTerm.search : ''}
          id={'search-todo-tag-input'}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={20} xl={20} className="form-group d-flex justify-content-end">
        <Radio.Group onChange={(e) => setFilter(e.target.value)}>
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="aday">within a day</Radio.Button>
          <Radio.Button value="over">over due</Radio.Button>
          <Radio.Button value="complete">completed</Radio.Button>
        </Radio.Group>
      </Col>
    </Row>
  );
};

export default Search;
