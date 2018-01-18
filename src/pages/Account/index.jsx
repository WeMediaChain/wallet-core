import React, { Component } from 'react';
import { Table } from 'antd';
import {
    observer,
    inject,
    PropTypes as MobxPropTypes,
} from 'mobx-react';
import autobind from 'autobind-decorator';
import PropTypes from 'proptypes';
import AccountHeader from '../../components/AccountHeader';
import './style';

@inject('statusStore', 'accountStore')
@observer
export default class Account extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object.isRequired,
        }).isRequired,
        statusStore: PropTypes.shape({
            toggleTransfer: PropTypes.func.isRequired,
        }).isRequired,
        accountStore: PropTypes.shape({
            fetchTransferList: PropTypes.func.isRequired,
            balance: PropTypes.number.isRequired,
            transactions: MobxPropTypes.arrayOrObservableArray.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        this.props.accountStore.fetchTransferList(this.props.match.params.address);
    }

    componentWillReceiveProps() {
        setTimeout(() => this.props.accountStore.fetchTransferList(this.props.match.params.address), 0);
    }

    @autobind
    onTransfer() {
        const { statusStore } = this.props;
        statusStore.toggleTransfer();
    }

    @autobind
    startTransfer(params) {
        console.log('transfer params', params, this.props);
    }

    render() {
        const { match, accountStore, statusStore } = this.props,
            { transactions, balance } = accountStore,
            account = {
                name: '账户1',
                cions: balance,
                key: match.params.address,
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
                    onRefresh={() => accountStore.fetchTransferList(match.params.address, true)}
                    onEdit={() => {}}
                    balance={balance}
                    address={match.params.address}
                    fee={0.01}/>
                <section className="account-list_content">
                    <div className="account-list-table_header">
                        <span className="header-title">最近交易</span>
                        <span className="header-desc">账户无法显示正在进行的交易，但是可以显示余额和已确认的转账记录。</span>
                    </div>
                    <Table
                        dataSource={transactions}
                        columns={columns}
                        loading={statusStore.isAccountTableLoading}
                        locale={{ emptyText: '暂无数据' }}
                        rowKey={record => record.id} />
                </section>
            </div>
        );
    }
}
