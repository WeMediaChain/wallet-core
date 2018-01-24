import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import TransferModal from '../TransferModal';
import QRcodeModal from '../QRcodeModal';
import './style';

const { clipboard } = window.require('electron');

@inject('statusStore')
@observer
export default class AccountHeader extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
        }).isRequired,
        onTransfer: PropTypes.func.isRequired,
        onTransferSubmit: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
        // onEdit: PropTypes.func.isRequired,
        qrcode: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        fee: PropTypes.number.isRequired,
        statusStore: PropTypes.shape({
            isRefresh: PropTypes.bool.isRequired,
            toggleQrcodeModal: PropTypes.func.isRequired,
            showToast: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        account: {
            name: '',
            balance: 0,
            address: '',
        },
        onTransfer: null,
        onTransferSubmit: null,
        onRefresh: null,
        // onEdit: null,
        qrcode: '',
        balance: 0,
        address: '',
        fee: 0,
        statusStore: {
            isRefresh: false,
            toggleQrcodeModal: null,
            showToast: null,
        },
    };

    copyAddress() {
        clipboard.writeText(this.props.account.address);
        this.props.statusStore.showToast('已复制到剪贴板');
    }

    render() {
        const {
                account,
                onRefresh,
                onTransfer,
                // onEdit,
                qrcode,
                onTransferSubmit,
                statusStore,
                balance,
                address,
                fee,
            } = this.props;

        return (
            <div className="account-list-header-container">
                <header className="account-list-header">
                    <p className="account-name">
                        <span>{account.name || '--'}</span>
                        {/* <Icon type="edit" onClick={onEdit} /> */}
                    </p>
                    <p className="account-cions">{account.balance}</p>
                    <p className="account-by">WMC</p>
                    <p className="account-key">
                        <span>{account.address}</span>
                        <Icon type="copy" className="icon" onClick={() => this.copyAddress()} />
                    </p>
                    <div className="account-trans" onClick={onTransfer}>发起转账</div>
                    <div className="account-action">
                        <div className="item" onClick={statusStore.toggleQrcodeModal}>
                            <Icon type="qrcode" className="icon" />
                            <p>二维码</p>
                        </div>
                        <div className="item" onClick={onRefresh}>
                            <Icon type={statusStore.isRefresh ? 'loading' : 'reload'} className="icon" />
                            <p>刷新</p>
                        </div>
                    </div>
                </header>
                <TransferModal
                    onConfirm={onTransferSubmit}
                    balance={balance}
                    address={address}
                    fee={fee} />
                <QRcodeModal value={qrcode} />
            </div>
        );
    }
}
