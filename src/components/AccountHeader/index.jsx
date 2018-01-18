import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Icon, message } from 'antd';
import { observer, inject } from 'mobx-react';
import { clipboard } from 'electron';
import TransferModal from '../TransferModal';
import './style';

@inject('statusStore')
@observer
export default class AccountHeader extends Component {
    static propTypes = {
        account: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cions: PropTypes.number.isRequired,
            key: PropTypes.string.isRequired,
        }).isRequired,
        onTransfer: PropTypes.func.isRequired,
        onTransferSubmit: PropTypes.func.isRequired,
        onRefresh: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired,
        qrcode: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        address: PropTypes.string.isRequired,
        fee: PropTypes.number.isRequired,
        statusStore: PropTypes.shape({
            isRefresh: PropTypes.bool.isRequired,
        }).isRequired,
    };
    
    static defaultProps = {
        account: {
            name: '',
            cions: 0,
            key: '',
        },
        onTransfer: null,
        onTransferSubmit: null,
        onRefresh: null,
        onEdit: null,
        qrcode: '',
        balance: 0,
        address: '',
        fee: 0,
    };
    
    copyAddress() {
        clipboard.writeText(this.props.account.key);
        message.info('已复制到剪贴板');
    }
    
    render() {
        const {
                account,
                onRefresh,
                onTransfer,
                onEdit,
                qrcode,
                onTransferSubmit,
                statusStore,
                balance,
                address,
                fee,
            } = this.props,
            { name, cions, key } = account;
        
        return (
            <div className="account-list-header-container">
                <header className="account-list-header">
                    <p className="account-name">
                        <span>{name}</span>
                        <Icon type="edit" onClick={onEdit} />
                    </p>
                    <p className="account-cions">{cions}</p>
                    <p className="account-by">WMC</p>
                    <p className="account-key">
                        <span>{key}</span>
                        <Icon type="copy" className="icon" onClick={() => this.copyAddress()} />
                    </p>
                    <div className="account-trans" onClick={onTransfer}>发起转账</div>
                    <div className="account-action">
                        <div className="item">
                            <Icon type="qrcode" className="icon" />
                            <p>二维码{qrcode}</p>
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
            </div>
        );
    }
}
