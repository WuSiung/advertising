import React, { FC } from 'react';
import {Button, Col, Row} from "antd";
import {history} from "umi";

interface ITitle {

}

const Title: FC<ITitle> = (props) => {
  return (
    <div>
      <Row justify="space-between">
        <Col>
          <Button onClick={() => history.goBack()}>{'< 后退'}</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Title;

