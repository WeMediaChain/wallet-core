import React, { Component } from 'react';
import { rpc } from '../../utils/rpc';

/* eslint-disable */
export default class Account extends Component {
    componentWillMount() {
        console.log(rpc);
        this.fetchList();
    }

    async fetchList() {
        const address = '0x243F7F63bc673056D8d2a2c1e31776561Dd7f708',
            balance = await rpc.balanceOf(address),
            transactions = await rpc.transactions(address);

        console.log(balance, transactions, this.props);
    }

    render() {
        const { params } = this.props.match;
        return (
            <div>账户：{params.address}</div>
        );
    }
}
