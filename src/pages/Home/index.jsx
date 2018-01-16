/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import { routes } from '../../router';
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
                path: '/account/0x92b748bb6cf3bbe5d0c3409ebbcd22a33fe5eb17',
                text: '账户1',
                icon: 'solution',
            },
            {
                path: '/account/0x71390Ad7724BC0c478C19531E389978F97cBB877',
                text: '账户2',
                icon: 'solution',
            },
        ];

        return (
            <Layout className="home-container">
                <SideBar items={sides} />
                <Content className="content">
                    <Switch>
                        {routes.map(route => <Route {...route} />)}
                    </Switch>
                </Content>
            </Layout>
        );
    }
}
