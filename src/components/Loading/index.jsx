/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import './style';

export default class Loading extends Component {
    render() {
        return (
            <Row className="loading-container">
                <Col span={12} />
                <Spin tip="Loading…" size="large" />
            </Row>
        );
    }
}
