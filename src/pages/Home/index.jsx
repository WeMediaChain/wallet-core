/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import SideBar from '../../components/Sidebar';
import { routes } from '../../router';
import './style';

const { Content } = Layout;

@inject('menuStore')
@observer
export default class Home extends Component {
    render() {
        const { bars } = this.props.menuStore;
        return (
            <Layout className="home-container">
                <SideBar items={bars.toJS()} />
                <Content className="content">
                    <Switch>
                        {routes.map(route => <Route {...route} />)}
                    </Switch>
                </Content>
            </Layout>
        );
    }
}
