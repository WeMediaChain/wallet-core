import React, { Component } from 'react';
import { Icon, Modal, Button, Form, Input } from 'antd';
import PropTypes from 'proptypes';
import autobind from 'autobind-decorator';
import './style';

const AntForm = Form;

/* eslint-disable no-unused-expressions */
class CreateAccountCard extends Component {
    static propTypes = {
        title: PropTypes.string,
        form: PropTypes.object.isRequired,
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
        limit: PropTypes.number,
    };

    static defaultProps = {
        title: '创建您的账号',
        form: {},
        onConfirm: () => {
        },
        onCancel: null,
        limit: 8,
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };
    }

    @autobind
    onConfirm() {
        const { form, onConfirm } = this.props,
            values = form.getFieldsValue();

        onConfirm && onConfirm(values);
        this.setState({ visible: false });
        form.resetFields();
    }

    @autobind
    onCancel() {
        const { onCancel, form } = this.props;

        onCancel && onCancel();
        this.setState({ visible: false });
        form.resetFields();
    }

    hasErrors() {
        const { form, limit } = this.props,
            values = form.getFieldsValue();

        return values.password !== values.repassword
            || (!values.password ||
                !values.repassword ||
                values.password.length < limit
                || values.repassword.length < limit);
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
                <Button onClick={this.onCancel} className="cancel">取消</Button>
                <Button
                    className="ok"
                    onClick={this.onConfirm}
                    type="primary"
                    disabled={this.hasErrors()}>确定</Button>
            </div>
        );
    }

    render() {
        const { visible } = this.state,
            { getFieldDecorator } = this.props.form;

        return (
            <div className="create-account-container">
                <div
                    role="button"
                    tabIndex="0"
                    className="create-account-card"
                    onClick={() => this.setState({ visible: true })}>
                    <Icon type="plus" className="icon" />
                    <span>新建账户</span>
                </div>
                <Modal
                    className="create-account-modal"
                    visible={visible}
                    onOk={this.onConfirm}
                    onCancel={this.onCancel}
                    title={this.renderModalTitle()}
                    footer={this.renderModalFooter()}>
                    <AntForm>
                        <AntForm.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入长度不小于8位的密码',
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
                                    placeholder="请输入长度不小于8位的密码" />)}
                        </AntForm.Item>
                        <AntForm.Item>
                            {getFieldDecorator('repassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请重复输入您的账户密码',
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
                                    placeholder="请重复输入您的账号密码" />)}
                        </AntForm.Item>
                    </AntForm>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(CreateAccountCard);
