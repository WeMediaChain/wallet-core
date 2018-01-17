import React from 'react';
import PropTypes from 'proptypes';
import { Icon } from 'antd';
import './style';

export default function AccountHeader(props) {
    const { account, onRefresh, onTransfer, onEdit, qrcode } = props,
        { name, cions, key } = account;

    return (
        <header className="account-list-header">
            <p className="account-name">
                <span>{name}</span>
                <Icon type="edit" onClick={onEdit} />
            </p>
            <p className="account-cions">{cions}</p>
            <p className="account-by">WMC</p>
            <p className="account-key">
                <span>{key}</span>
                <Icon type="copy" className="icon" />
            </p>
            <div className="account-trans" onClick={onTransfer}>发起转账</div>
            <div className="account-action">
                <div className="item">
                    <Icon type="qrcode" className="icon" />
                    <p>二维码{qrcode}</p>
                </div>
                <div className="item" onClick={onRefresh}>
                    <Icon type="reload" className="icon" />
                    <p>刷新</p>
                </div>
            </div>
        </header>
    );
}

AccountHeader.propTypes = {
    account: PropTypes.shape({
        name: PropTypes.string.isRequired,
        cions: PropTypes.number.isRequired,
        key: PropTypes.string.isRequired,
    }).isRequired,
    onTransfer: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    qrcode: PropTypes.string.isRequired,
};

AccountHeader.defaultProps = {
    account: {
        name: '',
        cions: 0,
        key: '',
    },
    onTransfer: null,
    onRefresh: null,
    onEdit: null,
    qrcode: '',
};
