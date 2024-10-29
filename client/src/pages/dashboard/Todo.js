import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from './../../redux/hooks';

import Input from './../../atoms/Input';
import Button from './../../atoms/Button';
import { Select, Space, Col, Row, Card, DatePicker } from 'antd';
//const { RangePicker } = DatePicker;

const options = [
  {
    value: 0,
    label: "Web3",
  },
  {
    value: 1,
    label: "React",
  },
  {
    value: 2,
    label: "Node",
  },
  {
    value: 3,
    label: "MongoDB",
  },
  {
    value: 4,
    label: "MySQL",
  },
  {
    value: 5,
    label: "PHP",
  },
  {
    value: 6,
    label: "JavaScript",
  },
  {
    value: 7,
    label: "TypeScript",
  },
  {
    value: 8,
    label: "HTML",
  }
];

const Todo = ({ description, setModal }) => {
  const { addTodo, todo, loading, updateTodo } = useTodo();

  const [formData, setFormData] = useState({
    tag: !loading && description === 'Update' ? todo.tags : 1,
    tagId: !loading && description === 'Update' ? todo.tags : 1,
    text: !loading && description === 'Update' ? todo.text : '',
    title: !loading && description === 'Update' ? todo.title : '',
    categories: !loading && description === 'Update' ? todo.categories : '',
    due_date: !loading && description === 'Update' ? todo.due_date : '',
  });

  //const { getTags, tags } = useTags();

  const tags = [{label: "Low", value: 1}, {label: "Medium", value: 2}, {label: "High", value: 3}];

  //useEffect(() => {
  //  getTags();
  //}, [getTags]);

  const { title, text, tag, tagId, due_date, categories } = formData;

  const onChange = (e) => {
    return setFormData(
      e.target.name === 'tag' && tagId !== '5f5689a2d096a9b777ea4124'
        ? {
            ...formData,
            tagId: e.target.options[e.target.options.selectedIndex].getAttribute(
              'option-id'
            ),
            tag: e.target.value
          }
        : { ...formData, [e.target.name]: e.target.value }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    description === 'Add' && addTodo({ title, text, tagId, tag, due_date, categories });
    description === 'Update' && updateTodo({ title, text, tagId, tag, due_date, categories }, todo._id);
    setModal({ isOpen: false });
  };

  const selPriority = (e) => {
    setFormData(
      {
        ...formData,
        tagId: e,
        tag: e === 1 ? 'Low' : e === 2 ? 'Medium' : 'High'
      }
    );
  }

  const onOk = (value) => {
    setFormData(
      {
        ...formData,
        due_date: value.$d,
      }
    );
  };

  const handleChange = (value) => {
    setFormData(
      {
        ...formData,
        categories: value,
      }
    );
  };

  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Card title={`${description} Todo`} bordered={false}>
      <Form>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className='mb-3'>
              <Input
              placeholder="Enter Title" 
                id="todo-title"
                type="text"
                value={title}
                name="title"
                onChange={(e) => onChange(e)}
                autoComplete="off"
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} className='mb-3'>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Enter description" 
                value={text}
                name="text"
                onChange={(e) => onChange(e)}
                id="todo-text"
              />
            </Col>
          </Row>
          
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className='mb-3'>
            <Space
              style={{
                width: '100%',
              }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                allowClear
                size="large"
                style={{
                  width: '100%',
                }}
                placeholder="Please select Categories"
                //defaultValue={}
                onChange={handleChange}
                options={options}
              />
            </Space>
          </Col>

          <Row justify="space-between">
            <Col xs={24} sm={24} md={24} lg={11} xl={11} className='mb-3'>
                <DatePicker
                  showTime
                  placeholder="End Date"
                  size="large"
                  style={{
                    width: '100%',
                  }}
                  onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                  }}
                  onOk={onOk}
                />
            </Col>

            <Col xs={24} sm={24} md={24} lg={11} xl={11} className='mb-3'>
              <Select
                showSearch
                size="large"
                style={{
                  width: '100%',
                }}
                defaultValue={description === 'Update' ? tags[todo.tags-1].label : {label: "Low", value: 1}}
                placeholder="Priority"
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={selPriority}
                options={tags}
              />
              {/* <Input
                as="select"
                //label="Todo Tag"
                id={`todo-tag-${description}`}
                type="text"
                value={tag}
                onChange={(e) => onChange(e)}
                name="tag"
                autoComplete="off"
                pClassName={tagId === '5f5689a2d096a9b777ea4124' ? 'd-none' : ''}
              >
                {tags.map((tag) => {
                  return (
                    <option
                      disabled={tag._id === '5f568965d096a9b777ea4123'}
                      option-id={tag._id}
                      key={tag._id}
                    >
                      {tag.name}
                    </option>
                  );
                })}
              </Input> */}
              <Input
                inputTextRight="X"
                inputTextRightOnClick={() => {
                  setFormData({ ...formData, tag: '', tagId: '' });
                }}
                label="Create a Tag"
                id={`todo-tag-other-${description}`}
                type="text"
                pClassName={tagId !== '5f5689a2d096a9b777ea4124' ? 'd-none' : 'd-block'}
                value={tagId === '5f5689a2d096a9b777ea4124' ? tag : ''}
                onChange={
                  tagId === '5f5689a2d096a9b777ea4124' ? (e) => onChange(e) : () => {}
                }
                name="tag"
                autoComplete="off"
              />
            </Col>
          </Row>

        <Button
          variant="secondary"
          text={description === 'Update' ? 'Update Todo' : 'Add Todo'}
          onClick={(e) => onSubmit(e)}
          color="white"
          type="submit"
          className="float-right"
          id={`todo-update-add-button-${description}`}
        />
      </Form>
    </Card>
  );
};

export default Todo;
