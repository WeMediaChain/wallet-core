import React, { Component } from 'react';
import AccountCard from '../../components/AccountCard';
import './style';

export default class AccountPreview extends Component {
    render() {
        const accounts = [
            {
                id: 1,
                name: '测试账户',
                cions: 2,
                key: '0x92b748bb6cf3bbe5d0c3409ebbcd22a33fe5eb17',
            },
            {
                id: 2,
                name: '账户2',
                cions: 120,
                key: '0x71390Ad7724BC0c478C19531E389978F97cBB877',
            },
            {
                id: 3,
                name: '账户3',
                cions: 20,
                key: '0x71390Ad7724BC0c478C19531E389978F97cBB877',
            },
            {
                id: 4,
                name: '账户4',
                cions: 37,
                key: '0x71390Ad7724BC0c478C19531E389978F97cBB877',
            },
        ];

        return (
            <div className="account-container">
                <header>
                    <p className="text">目前总共获取</p>
                    <p className="number">10</p>
                    <p className="text">币</p>
                </header>
                <section className="account-list">
                    {
                        accounts.map((account, index) => <AccountCard key={index} account={account} />)
                    }
                </section>
            </div>
        );
    }
}
