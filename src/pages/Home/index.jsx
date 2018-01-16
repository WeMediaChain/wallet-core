/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import './style';

const { Header, Content } = Layout;

export default class Home extends Component {
    render() {
        return (
            <Layout className="home-container">
                <Header className="home-header">
                    <span>OTCWallet</span>
                </Header>
                <Content className="content">
                    <span>test</span>
                </Content>
            </Layout>
        );
    }
}
