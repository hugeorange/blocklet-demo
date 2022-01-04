import React from 'react';
import { List, Divider } from 'antd';
import PropTypes from 'prop-types';
import './index.scss';

const BlockItem = (props) => {
  return (
    <div className="block-item-wrap">
      {!!props.blockList.length && (
        <Divider orientation="left" plain>
          <h2 className="title">Block {props.height}</h2>
        </Divider>
      )}
      <List
        className="demo-block-list"
        loading={props.loading}
        itemLayout="horizontal"
        locale={{ emptyText: '暂无数据' }}
        dataSource={props.blockList}
        renderItem={(item) => (
          <List.Item className="demo-item">
            <div className="label">{item.label}</div>
            <div className="content">{item.value}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

// 如果采用 tsx 写，就只用定义 interface 即可，不用再写 propTypes 了
BlockItem.propTypes = {
  blockList: PropTypes.array,
  loading: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
BlockItem.defaultProps = {
  blockList: [],
  loading: false,
  height: '',
};

export default BlockItem;
