import React, { Component } from 'react';
import { Icon, Table } from 'antd';
import AccountHeader from '../../components/AccountHeader';
import './style';
import { rpc } from '../../utils/rpc';

/* eslint-disable */
export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            balance: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.fetchList();
    }

    async fetchList() {
        const address = this.props.match.params.address,
            balance = await rpc.balanceOf(address),
            transactions = await rpc.transactions(address);
        this.setState({ transactions, balance });
        console.log(address, balance, transactions);
    }

    render() {
        const { params } = this.props.match,
            { transactions, balance } = this.state,
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
                    onTransfer={() => {}}
                    onRefresh={() => {}}
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
