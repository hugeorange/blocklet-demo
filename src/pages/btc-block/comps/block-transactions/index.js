import React from 'react';
import { List, Row, Divider } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './index.scss';

const BlockTransaction = (props) => {
  return (
    <div className="block-transaction-wrap">
      <Divider orientation="left" plain>
        <h2 className="title">Block Transactions</h2>
      </Divider>
      <List
        className="demo-trans-list"
        itemLayout="horizontal"
        locale={{ emptyText: '暂无数据' }}
        dataSource={props.transactions}
        pagination={{ defaultPageSize: 10 }}
        renderItem={(item) => (
          <List.Item className="trans-item">
            <div className="left">
              <Row>
                <div className="label">fee:</div>
                <div className="value">{item.fee}</div>
              </Row>
              <Row>
                <div className="label">block_height:</div>
                <div className="value">{item.block_height}</div>
              </Row>
              <Row>
                <div className="label">hash:</div>
                <div className="value">
                  <a href={`https://www.blockchain.com/btc/tx/${item.hash}`} target="_blank" rel="noopener noreferrer">
                    {item.hash}
                  </a>
                </div>
              </Row>
              <Row>
                <div className="label">时间:</div>
                <div className="value">{dayjs.unix(item.time).format('YYYY-MM-DD hh:mm:ss')}</div>
              </Row>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

// 如果采用 tsx 写，就只用定义 interface 即可，不用再写 propTypes 了
BlockTransaction.propTypes = {
  transactions: PropTypes.array,
};
BlockTransaction.defaultProps = {
  transactions: [],
};

export default BlockTransaction;
