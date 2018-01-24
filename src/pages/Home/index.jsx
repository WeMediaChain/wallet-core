/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'proptypes';
import { Switch, Route, withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import SideBar from '../../components/Sidebar';
import Toast from '../../components/Toast';
import { routes } from '../../router';
import './style';

const { Content } = Layout;

@inject('accountStore')
@withRouter
@observer
export default class Home extends Component {
    static propTypes = {
        accountStore: PropTypes.shape({
            accountMenus: PropTypes.array.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        accountStore: {
            accountMenus: [],
        },
    };

    render() {
        const { accountStore } = this.props;

        return (
            <Layout className="home-container">
                <SideBar items={accountStore.accountMenus} />
                <Content className="content">
                    <Switch>
                        {routes.map(route => <Route {...route} />)}
                    </Switch>
                    <Toast />
                </Content>
            </Layout>
        );
    }
}
