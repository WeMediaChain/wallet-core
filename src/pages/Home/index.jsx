/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import SideBar from '../../components/Sidebar';
import './style';

const { Content } = Layout;

export default class Home extends Component {
    render() {
        const sides = [
            {
                path: '/',
                text: '账户总览',
                icon: 'wallet',
            },
            {
                path: '/account',
                text: '账户1',
                icon: 'solution',
            },
        ];

        return (
            <Layout className="home-container">
                <SideBar items={sides} />
                <Content className="content">
                    <span>test</span>
                </Content>
            </Layout>
        );
    }
}
