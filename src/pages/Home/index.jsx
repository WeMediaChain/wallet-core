/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Switch, Route, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import SideBar from '../../components/Sidebar';
import { routes } from '../../router';
import './style';

const { Content } = Layout;

@inject('menuStore')
@withRouter
@observer
export default class Home extends Component {
    render() {
        const { menuStore } = this.props;

        return (
            <Layout className="home-container">
                <SideBar items={menuStore.menus.toJS()} />
                <Content className="content">
                    <Switch>
                        {routes.map(route => <Route {...route} />)}
                    </Switch>
                </Content>
            </Layout>
        );
    }
}
