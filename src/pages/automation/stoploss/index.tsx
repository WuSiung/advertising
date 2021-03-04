import { Card, Tabs, Table, Popover, Select, Row, Col, Pagination, Switch, Button, Space, Dropdown, Menu } from 'antd'
import React, { FC, ReactNode, useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { connect, Dispatch, history } from 'umi'
import { SearchOutlined, CaretDownOutlined, DownOutlined } from '@ant-design/icons';
import { useDidMountEffect } from "@/utils/customerHooks";
import styles from './index.less';

const StopLoss: FC<any> = (props) => {
   return (<>
       <Card>
           
       </Card>
   </>);
}
export default connect(({ stoploss, loading }: { stoploss: any, loading: { effects: { [key: string]: boolean } } }) => ({
    stoploss,
    loadingAdvPack: loading.effects['adv/fetchAdvPackList'],
    loadingAdvSet: loading.effects['adv/fetchAdvSetList'],
    loadingAdvAdv: loading.effects['adv/fetchAdvAdvList'],
}))(StopLoss)