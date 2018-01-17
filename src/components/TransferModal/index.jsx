import React, { Component } from 'react';
import { Modal, Button, Form, Input, Icon } from 'antd';
import PropTypes from 'proptypes';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import './style';

const AntForm = Form;

/* eslint-disable no-unused-expressions */
@inject('modalStore')
@observer
class TransferModal extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        title: PropTypes.string,
        modalStore: PropTypes.object,
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
    };

    static defaultProps = {
        form: {},
        title: '发起转账',
        modalStore: {},
        onConfirm: null,
        onCancel: null,
    };

    @autobind
    onConfirm() {
        const { onConfirm, modalStore, form } = this.props,
            values = form.getFieldsValue();

        onConfirm && onConfirm(values);
        modalStore.toggleTransfer();
    }

    @autobind
    onCancel() {
        const { modalStore, onCancel } = this.props;
        onCancel && onCancel();
        modalStore.toggleTransfer();
    }

    hasErrors() {
        const { form } = this.props,
            values = form.getFieldsValue();

        return Object
            .keys(values)
            .some(field => !values[field]);
    }

    renderModalTitle() {
        return (
            <div className="modal-title-container">
                <span>{this.props.title}</span>
            </div>
        );
    }

    renderModalFooter() {
        return (
            <div className="modal-footer-container">
                <Button onClick={this.onCancel} type="danger">取消</Button>
                <Button
                    onClick={this.onConfirm}
                    type="primary"
                    disabled={this.hasErrors()}>确定</Button>
            </div>
        );
    }

    render() {
        const { modalStore, form } = this.props,
            { getFieldDecorator } = form;

        return (
            <Modal
                visible={modalStore.transferModal}
                onOk={this.onConfirm}
                onCancel={this.onCancel}
                title={this.renderModalTitle()}
                footer={this.renderModalFooter()}>
                <AntForm>
                    <AntForm.Item>
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入对方账户',
                                },
                            ],
                            initialValue: '',
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入对方账户" />)}
                    </AntForm.Item>
                    <AntForm.Item>
                        {getFieldDecorator('money', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入转账金额',
                                },
                            ],
                            initialValue: '',
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="number"
                                placeholder="请输入转账金额" />)}
                    </AntForm.Item>
                </AntForm>
            </Modal>
        );
    }
}

export default Form.create()(TransferModal);
