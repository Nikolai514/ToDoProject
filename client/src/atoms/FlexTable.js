import React from 'react';
import './FlexTable.css';
import Icon from './Icon';
// import { formatDate } from './../helpers/formatDate';
import {
  TwitterOutlined,
} from '@ant-design/icons';
import {  Space, Col, Row, Tag } from 'antd';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const tags = [{label: "Low", value: 1}, {label: "Medium", value: 2}, {label: "High", value: 3}];

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

const titleData = [
  {
    title: 'Title',
    fieldName: 'title',
    className: 'col-xs-2',
  },
  {
    title: 'Description',
    fieldName: 'text',
    className: 'col-xs-2',
  },
  {
    title: 'Priority',
    fieldName: 'tags',
    className: 'col-xs-2',
  },
  {
    title: 'Created/Updated At',
    fieldName: 'date',
    className: 'col-xs-3'
  },
  {
    title: 'End date',
    fieldName: 'due_date',
    className: 'col-xs-3'
  },
  {
    title: 'Categories',
    fieldName: 'categories',
    className: 'col-xs-3'
  },
  {
    title: 'Edit',
    fieldName: 'icon',

    icons: ['Edit', 'Check', 'TrashAlt'],
    className: 'col-xs-3',
  }
];
const FlexTable = ({ data = [], iconClick, tableId }) => {
  return (
    <div id={`${tableId}`} className={`flexTable flexTable--5cols flexTable--collapse `}>
      {data.map((item, i) => (
        <React.Fragment key={'row' + i}>
          <div className={`flexTable-row ${item.completed ? 'flexTable-row-completed' : 'flexTable-row-unCompleted'}`} style={{ display: 'flow' }}>
            <Row>
              <Col xs={24} sm={24} md={6} lg={7} xl={8}>
              <div className={`flexTable-cell title-cell`}>
                <div className="flexTable-cell--heading">Title</div>
                <div className={`flexTable-cell--content title-content`}>
                  {item.title}
                </div>
              </div>
              </Col>
              <Col xs={24} sm={24} md={13} lg={13} xl={13}>
              <div className={`flexTable-cell text-cell`}>
                <div className="flexTable-cell--heading">Description</div>
                <div className={`flexTable-cell--content text-content`}>
                  {item.text}
                </div>
              </div>
              </Col>
              <Col xs={24} sm={24} md={5} lg={4} xl={3}>
              <div className={`flexTable-cell`} name={item.id}>
                <div className="flexTable-cell--heading">Icon</div>
                <div className={`flexTable-cell--content icon-content`}>
                  {['Edit', 'Check', 'TrashAlt'].map((icon, i) => (
                    <Icon
                      key={i}
                      name={item._id}
                      icon={'fa' + icon}
                      onClick={iconClick}
                      id={icon}
                      size={'1x'}
                      fixedWidth
                    />
                  ))}
                </div>
              </div>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col xs={24} sm={24} md={12} lg={12} xl={15}>
                <Row>
                  <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                  <div className="flexTable-cell" style={{flexGrow: '0'}}>
                    <div className="flexTable-cell--heading">Priority</div>
                    <div className={`flexTable-cell--content tags-content`}>
                      <Tag icon={<TwitterOutlined />} color="default">{tags[item.tags-1].label}</Tag>
                    </div>
                  </div>
                  </Col>
                  <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                  <div className="flexTable-cell and-flow" style={{flexGrow: '0'}}>
                    <div className="flexTable-cell--heading">Categories</div>
                    <div className={`flexTable-cell--content tags-content`} style={{ display: 'flex' }}>
                      {
                        item.categories.map((items) => {
                          return(
                            <Tag icon={<TwitterOutlined />} color="default">{options[items].label}</Tag>
                          )
                        })
                      }
                    </div>
                  </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={9}>
                <Row>
                  <div className={`flexTable-cell`}>
                      <div className="flexTable-cell--heading">Created At</div>
                      <div className={`flexTable-cell--content date-content`}>
                        {item.date}
                      </div>
                    </div>
                    <div className={`flexTable-cell`}>
                      <div className="flexTable-cell--heading">End Date</div>
                      <div className={`flexTable-cell--content tags-content`}>
                        {item.due_date}
                      </div>
                    </div>
                </Row>
              </Col>
            </Row>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlexTable;
