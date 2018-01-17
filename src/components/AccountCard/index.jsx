import React, { Component } from 'react';
import { Icon, Modal, Button } from 'antd';
import autobind from 'autobind-decorator';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import './style';

/* eslint-disable no-unused-expressions */
export default class AccountCard extends Component {
    static propTypes = {
        account: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]),
            name: PropTypes.string.isRequired,
            cions: PropTypes.number.isRequired,
            key: PropTypes.string.isRequired,
        }).isRequired,
        link: PropTypes.string.isRequired,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        title: PropTypes.string,
    };

    static defaultProps = {
        account: {
            id: 1,
            name: '',
            cions: 0,
            key: '',
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
                <Button onClick={this.onCancel} type="danger">取消</Button>
                <Button onClick={this.onConfirm} type="primary">确定</Button>
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
            { id, name, cions, key } = account,
            showID = id > 9 ? id : `0${id}`;

        return (
            <div className="account-card-container">
                <Link className="account-block" to={`${link}/${key}`}>
                    <p className="account-id">{showID}</p>
                    <Icon type="delete" className="account-remove" onClick={this.onDelete} />
                    <div className="account-content">
                        <p className="account-name">{name}</p>
                        <p className="account-cions">{cions}</p>
                        <p className="account-by">币</p>
                        <p className="account-key">{key}</p>
                    </div>
                </Link>
                <Modal
                    visible={modalStatus}
                    title={this.renderModalTitle()}
                    onOk={this.onConfirm}
                    onCancel={this.onCancel}
                    footer={this.renderModalFooter()}>
                    <p>删除的账户地址将不在口袋内显示，请备份后再操作。是否确认删除该账户地址？</p>
                </Modal>
            </div>
        );
    }
}