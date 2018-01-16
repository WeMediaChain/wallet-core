/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import './style';

const { Sider } = Layout,
    SideMenu = Menu;

export default class Home extends Component {
    static propTypes = {
        collapsed: PropTypes.bool,
        items: PropTypes.array.isRequired,
    };

    static defaultProps = {
        collapsed: false,
        items: [],
    };

    render() {
        const { collapsed, items } = this.props;

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Link to="/">
                    <div className="logo" />
                </Link>
                <SideMenu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['0']}
                >
                    {
                        items.map((item, key) => (
                            <SideMenu.Item key={key}>
                                <Icon type={item.icon} />
                                <Link to={item.path}>
                                    {item.text}
                                </Link>
                            </SideMenu.Item>),
                        )
                    }
                </SideMenu>
            </Sider>
        );
    }
}
