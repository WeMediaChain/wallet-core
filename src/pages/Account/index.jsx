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
import ConfirmPasswordModal from '../../components/ConfirmPassword';
import { rpc } from '../../utils/rpc';
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
            toggleConfirmPasswordStatus: PropTypes.func.isRequired,
        }).isRequired,
        accountStore: PropTypes.shape({
            fetchTransferList: PropTypes.func.isRequired,
            currentShowAccount: PropTypes.shape({
                name: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
                transactions: MobxPropTypes.arrayOrObservableArray.isRequired,
            }).isRequired,
            setCurrentShowAccount: PropTypes.func.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        match: {
            params: {},
        },
        statusStore: {
            toggleTransfer: null,
            toggleConfirmPasswordStatus: null,
        },
        accountStore: {
            fetchTransferList: null,
            setCurrentShowAccount: null,
            currentShowAccount: {
                name: '--',
                balance: 0,
                transactions: [],
            },
        },
    };

    componentDidMount() {
        this.props.accountStore.setCurrentShowAccount(this.props.match.params.address);
    }

    componentWillReceiveProps(nextProps) {
        const { accountStore } = this.props,
            { match } = nextProps;
        accountStore.setCurrentShowAccount(match.params.address);
    }

    @autobind
    onTransfer() {
        const { statusStore } = this.props;
        statusStore.toggleTransfer();
    }

    @autobind
    onConfirmPwd(param) {
        const { accountStore } = this.props;
        accountStore.setTransferInfo(param);
        setTimeout(() => accountStore.startTransfer(), 0);
    }

    @autobind
    startTransfer(params) {
        const { statusStore, accountStore, match } = this.props;
        accountStore.setTransferInfo({
            ...params,
            tranferAddress: match.params.address,
        });
        statusStore.toggleConfirmPasswordStatus();
    }

    render() {
        const { match, accountStore, statusStore } = this.props,
            { currentShowAccount, transferInfo } = accountStore,
            columns = [
                {
                    title: 'From',
                    dataIndex: 'returnValues',
                    render: (text) => text.from,
                    key: '1',
                },
                {
                    title: 'To',
                    dataIndex: 'returnValues',
                    render: (text) => text.to,
                    key: '2',
                },
                {
                    title: '金额',
                    dataIndex: 'returnValues',
                    render: (text) => rpc.web3.fromWei(text.value),
                    key: '3',
                },
            ];

        return (
            <div className="account-list-container">
                <AccountHeader
                    account={currentShowAccount}
                    qrcode={match.params.address}
                    onTransfer={this.onTransfer}
                    onTransferSubmit={this.startTransfer}
                    onRefresh={() => accountStore.fetchTransferList(match.params.address)}
                    balance={currentShowAccount.balance}
                    address={match.params.address}
                    fee={transferInfo.fee} />
                <section className="account-list_content">
                    <div className="account-list-table_header">
                        <span className="header-title">最近交易</span>
                        <span className="header-desc">账户无法显示正在进行的交易，但是可以显示余额和已确认的转账记录。</span>
                    </div>
                    <Table
                        dataSource={currentShowAccount.transactions}
                        columns={columns}
                        loading={statusStore.isAccountTableLoading}
                        locale={{ emptyText: '暂无数据' }}
                        rowKey={record => record.id} />
                </section>
                <ConfirmPasswordModal
                    onConfirm={this.onConfirmPwd}
                    transferMoney={transferInfo.money}
                    fee={transferInfo.fee}
                    transferAccount={transferInfo.tranferAddress}
                    intoAccount={transferInfo.address}
                 />
            </div>
        );
    }
}
