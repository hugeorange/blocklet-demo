import React, { useState, useEffect, useRef } from 'react';
import { Input, message } from 'antd';
import dayjs from 'dayjs';
import api from '../../libs/api';
import logo from '../../logo.svg';
import BlockItem from './comps/block-item/index';
import BlockTransaction from './comps/block-transactions/index';
import './index.scss';

const BtcBlock = () => {
  const [blockList, setblockList] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setloading] = useState(false);
  const blockDataRef = useRef(null);
  useEffect(() => {
    getBlockList();
  }, []);

  const getBlockList = async (value) => {
    setloading(true);
    try {
      const hash = value || '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';
      const { data } = await api.get(`https://blockchain.info/rawblock/${hash}`);

      blockDataRef.current = data;
      const list = Object.keys(data)
        .filter((v) => v !== 'tx')
        .map((v) => {
          const content = v === 'time' ? dayjs.unix(data[v]).format('YYYY-MM-DD hh:mm:ss') : data[v];
          return { label: v, value: content };
        });
      setblockList(list);
      setTransactions(data.tx);
    } catch (error) {
      message.error('请输入正确的block hash');
      setblockList([]);
      setTransactions([]);
    }
    setloading(false);
  };
  return (
    <div className="block-wrap">
      <img src={logo} className="logo" alt="logo" />
      <Input.Search
        className="input-btn"
        placeholder="请输入比特币的 Block Hash"
        loading={loading}
        enterButton
        onSearch={(value) => {
          getBlockList(value);
        }}
      />
      <p className="show">默认演示hash: 00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa</p>
      <BlockItem blockList={blockList} loading={loading} height={blockDataRef.current?.height} />
      {!!blockList.length && <BlockTransaction transactions={transactions} />}
    </div>
  );
};

export default BtcBlock;
