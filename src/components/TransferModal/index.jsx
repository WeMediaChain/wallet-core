import React, { Component } from 'react';
import { Modal, Button, Form, Input, Icon } from 'antd';
import PropTypes from 'proptypes';
import autobind from 'autobind-decorator';
import './style';

const AntForm = Form;

class TransferModal extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        title: PropTypes.string,
    };

    static defaultProps = {
        form: {},
        title: '发起转账',
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };
    }

    @autobind
    onConfirm() {
        console.log('confirm', this.state);
        this.setState({ visible: false });
    }

    @autobind
    onCancel() {
        console.log('cancel', this.state);
        this.setState({ visible: false });
    }

    showModal() {
        this.setState({ visible: true });
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
        const { visible } = this.state,
            { getFieldDecorator } = this.props.form;

        return (
            <Modal
                visible={visible}
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
                                placeholder="请输入转账金额" />)}
                    </AntForm.Item>
                </AntForm>
            </Modal>
        );
    }
}

export default Form.create()(TransferModal);
