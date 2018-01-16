/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import PropTypes from 'proptypes';
import './style';

const { Header } = Layout;

export default class CustomHeader extends Component {
    static propTypes = {
        collapsed: PropTypes.bool,
        toggle: PropTypes.func,
    };
    
    static defaultProps = {
        collapsed: false,
        toggle: null,
    };
    
    render() {
        const { collapsed, toggle } = this.props;
        return (
            <Header className="header">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggle}
                />
            </Header>
        );
    }
}
