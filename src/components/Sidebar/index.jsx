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
        items: PropTypes.array.isRequired,
        logo: PropTypes.string.isRequired,
    };

    static defaultProps = {
        items: [],
        logo: '',
    };

    render() {
        const { items, logo } = this.props;

        return (
            <Sider>
                <div className="logo">
                    {logo ? <img src={logo} alt="OTCWallet" /> : null}
                </div>
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
