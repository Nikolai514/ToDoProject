import React, { useState, useEffect } from 'react';
import { useSearch, usePagination } from './../../redux/hooks';

//import { DownloadOutlined } from '@ant-design/icons';
import { Radio, Row, Col } from 'antd';

import Input from './../../atoms/Input';

const Search = () => {
  // const [size, setSize] = useState('large');
   //const todos = useTodo().todos;

  const { setSearchTerm, searchTerm, isActive } = useSearch();
  const { setPageReset } = usePagination();
  //const { setStateFilter } = useStateFilter();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  
  // const handleChange = (e) => {
  //   console.log(e.target.value, '------interface------')
  //   setPageReset(true);
  //   setSearchTerm(e.target.value);
  // };

  // const selStateFilter = (value) => {
  //   setPageReset(true);
  //   setStateFilter(value, todos); // Pass your todo data here
  // };

  useEffect(() => {
    setPageReset(true);
    setSearchTerm({search: search, filter: filter});
  }, [filter, search]);

  return (
    <Row justify="space-between" style={{ alignItems: "flex-end" }}>
      <Col>
        <Input
          type="text"
          placeholder="search by tag"
          className="border-top-0 border-left-0 border-right-0"
          pClassName="mb-0"
          onChange={(e) => setSearch(e.target.value)}
          value={isActive ? searchTerm.search : ''}
          id={'search-todo-tag-input'}
        />
      </Col>
      <Col>
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
