import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import PreviewHeader from '../../components/PreviewHeader';
import AccountCard from '../../components/AccountCard';
import CreateAccountCard from '../../components/CreateAccountCard';
import './style';

@inject('accountStore')
@observer
export default class AccountPreview extends Component {

    @autobind
    createAccount(params) {
        this.props.accountStore.createAccount(params);
    }

    @autobind
    deleteAccount(account) {
        this.props.accountStore.deleteAccount(account);
    }

    render() {
        const { accounts } = this.props.accountStore;

        return (
            <div className="account-container">
                <PreviewHeader cions={9} />
                <section className="account-list">
                    {
                        accounts.map((account, index) => (
                                <AccountCard
                                    key={index}
                                    link="/account"
                                    onConfirm={this.deleteAccount}
                                    account={account} />
                            ),
                        )
                    }
                    <CreateAccountCard onConfirm={this.createAccount} />
                </section>
            </div>
        );
    }
}
