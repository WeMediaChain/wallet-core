/**
 * Created by Min on 2017/7/11.
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'proptypes';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import './style';

const { Sider } = Layout,
    SideMenu = Menu;

@observer
export default class Home extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        logo: PropTypes.string.isRequired,
    };
    
    static defaultProps = {
        items: [],
        logo: '',
    };
    
    static contextTypes = {
        router: PropTypes.object,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            currentId: ['0'],
        };
    }
    
    componentWillReceiveProps() {
        const currentId = this.calculateCurrentMenu();
        this.setState({ currentId });
    }
    
    calculateCurrentMenu() {
        const { location } = this.context.router.history,
            currentID = this.props.items.findIndex(
                item => item.path === location.pathname);
        return [currentID.toString()];
    }
    
    render() {
        const { items, logo } = this.props,
            { currentId } = this.state;
        
        return (
            <Sider className="side-container">
                <div className="logo">
                    <img src={!logo ? 'http://p2dflfpg4.bkt.clouddn.com/wmc-04@3x.png' : ''} alt="OTCWallet" />
                </div>
                <SideMenu
                    className="side-item"
                    theme="dark"
                    mode="inline"
                    selectedKeys={currentId}
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
