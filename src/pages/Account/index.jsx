import React, { Component } from 'react';
import { Icon, Table, message } from 'antd';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import AccountHeader from '../../components/AccountHeader';
import './style';
import { rpc } from '../../utils/rpc';

/* eslint-disable */
@inject('modalStore')
@observer
export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            balance: 0,
        };
    }

    componentWillReceiveProps() {
        setTimeout(() => this.fetchList(), 0);
    }

    async fetchList(isRefresh = false) {
        try{
            isRefresh && this.props.modalStore.toggleRefresh(true);
            const { address } = this.props.match.params,
                balance = await rpc.balanceOf(address),
                transactions = await rpc.transactions(address);

            this.props.modalStore.toggleRefresh();
            this.setState({ transactions, balance });
        } catch(err) {
            this.props.modalStore.toggleRefresh(false);
            message.error(`${isRefresh ? '刷新' : '获取'}账户信息失败`);
        }
    }

    @autobind
    onTransfer() {
        const { modalStore } = this.props;
        modalStore.toggleTransfer();
    }

    @autobind
    startTransfer(params) {
        console.log('transfer params', params);
        console.log(this.state);
    }

    render() {
        const { params } = this.props.match,
            { transactions, balance, isRefresh } = this.state,
            account = {
                name: '账户1',
                cions: balance,
                key: params.address,
            },
            columns = [
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: '1',
                },
                {
                    title: 'Form',
                    dataIndex: 'returnValues',
                    render: (text) => text.from,
                    key: '2',
                },
                {
                    title: 'To',
                    dataIndex: 'returnValues',
                    render: (text) => text.to,
                    key: '3',
                },
                {
                    title: 'Value',
                    dataIndex: 'returnValues',
                    render: (text) => text.value,
                    key: '4',
                },
            ];

        return (
            <div className="account-list-container">
                <AccountHeader
                    account={account}
                    qrcode=""
                    onTransfer={this.onTransfer}
                    onTransferSubmit={this.startTransfer}
                    onRefresh={() => this.fetchList(true)}
                    onEdit={() => {}} />
                <section className="account-list_content">
                    <div className="account-list-table_header">
                        <span className="header-title">最近交易</span>
                        <span className="header-desc">账户无法显示正在进行的交易，但是可以显示余额和已确认的转账记录。</span>
                    </div>
                    <Table
                        dataSource={transactions}
                        columns={columns}
                        locale={{emptyText: '暂无数据'}}
                        rowKey={record => record.id} />
                </section>
            </div>
        );
    }
}
