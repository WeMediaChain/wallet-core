import React, { Component } from 'react';
import { Icon, Modal, Button } from 'antd';
import autobind from 'autobind-decorator';
import classname from 'classnames';
import { observer } from 'mobx-react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import './style';

/* eslint-disable no-unused-expressions */
@observer
export default class AccountCard extends Component {
    static propTypes = {
        account: PropTypes.shape({
            index: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
        }).isRequired,
        link: PropTypes.string.isRequired,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        title: PropTypes.string,
    };

    static defaultProps = {
        account: {
            index: 1,
            name: '',
            balance: 0,
            address: '',
        },
        link: '',
        onConfirm: null,
        onCancel: null,
        title: '确认删除账户',
    };

    constructor(props) {
        super(props);

        this.state = {
            modalStatus: false,
        };
    }

    @autobind
    onConfirm() {
        const { onConfirm, account } = this.props;
        onConfirm && onConfirm(account);
        this.setState({ modalStatus: false });
    }

    @autobind
    onCancel() {
        const { onCancel } = this.props;
        onCancel && onCancel();
        this.setState({ modalStatus: false });
    }

    @autobind
    onDelete(e) {
        e.preventDefault();
        this.setState({ modalStatus: true });
    }

    renderModalFooter() {
        return (
            <div className="modal-footer-container">
                <Button onClick={this.onCancel} className="cancel">取消</Button>
                <Button onClick={this.onConfirm} className="ok">确定</Button>
            </div>
        );
    }

    renderModalTitle() {
        return (
            <div className="modal-title-container">
                <span>{this.props.title}</span>
            </div>
        );
    }

    render() {
        const { modalStatus } = this.state,
            { account, link } = this.props,
            { name, balance, address } = account,
            index = account.index + 1,
            showID = index > 9 ? index : `0${index}`;

        return (
            <div className="account-card-container">
                <Link
                    className={classname({
                        'account-block': true,
                        breaker: index % 3 === 0,
                    })}
                    to={`${link}/${address}`}>
                    <p className="account-id">{showID}</p>
                    <Icon
                        type="delete"
                        className="account-remove"
                        onClick={this.onDelete} />
                    <div className="account-content">
                        <p className="account-name">{name}</p>
                        <p className="account-cions">{balance}</p>
                        <p className="account-key">{address}</p>
                    </div>
                </Link>
                <Modal
                    className="delete-account-modal"
                    visible={modalStatus}
                    title={this.renderModalTitle()}
                    onOk={this.onConfirm}
                    onCancel={this.onCancel}
                    footer={this.renderModalFooter()}>
                    <p className="delete-tip">删除的账户地址将不显示，是否确认删除该账户地址？</p>
                </Modal>
            </div>
        );
    }
}
