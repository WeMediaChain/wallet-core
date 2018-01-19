import React, { Component } from 'react';
import { Modal } from 'antd';
import PropTypes from 'proptypes';
import { observer, inject } from 'mobx-react';
import QRCode from 'qrcode.react';
import './style';

@inject('statusStore')
@observer
export default class QRcodeModal extends Component {
    static propTypes = {
        statusStore: PropTypes.shape({
            qrcodeModal: PropTypes.bool.isRequired,
            toggleQrcodeModal: PropTypes.func.isRequired,
        }).isRequired,
        value: PropTypes.string.isRequired,
    };

    static defaultProps = {
        statusStore: {
            qrcodeModal: false,
            toggleQrcodeModal: null,
        },
        value: '',
    };

    render() {
        const { statusStore, value } = this.props,
            { qrcodeModal, toggleQrcodeModal } = statusStore;

        return (
            <Modal
                className="qrcode-modal-container"
                visible={qrcodeModal}
                onOk={toggleQrcodeModal}
                closable={false}
                footer={null}
                onCancel={toggleQrcodeModal}>
                <QRCode value={value} />
                <p>账户地址二维码</p>
            </Modal>
        );
    }
}
