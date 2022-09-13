import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Collapse, Avatar, Select } from 'antd';
import millify from 'millify';

import { useGetCryptoExchangesQuery, useGetCryptosQuery } from '../services/cryptoAPI';

const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const Exchanges = () => {
  const [orderBy, setOrderBy] = useState('24hVolume');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [coinId, setCoinId] = useState('Qwsogvtv82FCd'); // Default bitcoin

  const { data, isFetching } = useGetCryptoExchangesQuery({ coinId, orderBy, orderDirection });
  const { data: coinsData } = useGetCryptosQuery(100);

  if (!data?.data || !coinsData?.data?.coins ) return 'Loading...';
  const exchangeList = data?.data?.exchanges;
  const coinsList = coinsData?.data?.coins;

  return (
    <>
      <Col span={24}>
        <Select
          showSearch
          className='select-news'
          placeholder='Select a crypto'
          optionFilterProp='children'
          onChange={(value) => setCoinId(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {coinsList.map((coin) => <Option value={coin.uuid}>{coin.name}</Option>)}
        </Select>
      </Col>
      
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>
      <Row>
        {exchangeList.map((exchange) => (
          <Col span={24} style={{ paddingBottom: '10px'}}>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className='exchange-image' src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>{millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.price)}</Col>
                  </Row>
                )}
              >
              </Panel>
         
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges