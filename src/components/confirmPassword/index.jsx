import React, { Component } from 'react';
import { Icon, Modal, Button, Form, Input } from 'antd';
import PropTypes from 'proptypes';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import './style';

const AntForm = Form;

/* eslint-disable no-unused-expressions */
@inject('statusStore')
@observer
class ConfirmPassword extends Component {
    static propTypes = {
        title: PropTypes.string,
        form: PropTypes.object.isRequired,
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
        transferMoney: PropTypes.oneOfType([
            PropTypes.number.isRequired,
            PropTypes.string.isRequired,
        ]),
        fee: PropTypes.number.isRequired,
        transferAccount: PropTypes.string.isRequired,
        intoAccount: PropTypes.string.isRequired,
        statusStore: PropTypes.shape({
            confirmPwdModal: PropTypes.bool.isRequired,
            toggleConfirmPasswordStatus: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        title: '确认交易',
        form: {},
        onConfirm: () => {
        },
        onCancel: null,
        transferMoney: 0.1,
        fee: 0.01,
        transferAccount: '',
        intoAccount: '',
        statusStore: {
            confirmPwdModal: false,
            toggleConfirmPasswordStatus: null,
        },
    };

    @autobind
    onConfirm() {
        const { form, onConfirm, statusStore } = this.props,
            values = form.getFieldsValue();

        onConfirm && onConfirm(values);
        statusStore.toggleConfirmPasswordStatus();
    }

    @autobind
    onCancel() {
        const { onCancel, statusStore } = this.props;

        onCancel && onCancel();
        statusStore.toggleConfirmPasswordStatus();
    }

    hasErrors() {
        const { form } = this.props,
            values = form.getFieldsValue();

        return !values.password;
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
        const {
            form,
            transferMoney,
            fee,
            transferAccount,
            intoAccount,
            statusStore,
        } = this.props,
            formItemLayout = {
                labelCol: { span: 4 },
                wrapperCol: { span: 17 },
            };

        return (
            <Modal
                visible={statusStore.confirmPwdModal}
                onOk={this.onConfirm}
                onCancel={this.onCancel}
                title={this.renderModalTitle()}
                footer={this.renderModalFooter()}>
                <div className="confirm-password-tip">
                    <p><b>转账金额：</b><span>{transferMoney}</span></p>
                    <p><b>手续费：</b><span>{fee}</span></p>
                </div>
                <AntForm className="confirm-password-modal">
                    <AntForm.Item className="confirm-password-item" {...formItemLayout} label="转出账户">
                        <span>{transferAccount}</span>
                    </AntForm.Item>
                    <AntForm.Item className="confirm-password-item" {...formItemLayout} label="转入账户">
                        <span>{intoAccount}</span>
                    </AntForm.Item>
                    <AntForm.Item className="confirm-password-item" {...formItemLayout} label="密码">
                        {form.getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入您的账户密码',
                                },
                            ],
                            initialValue: '',
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入您的账号密码以确认交易" />)}
                    </AntForm.Item>
                </AntForm>
            </Modal>
        );
    }
}

export default Form.create()(ConfirmPassword);
