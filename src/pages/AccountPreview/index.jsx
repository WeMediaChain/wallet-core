import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { observer, inject } from 'mobx-react';
import PreviewHeader from '../../components/PreviewHeader';
import AccountCard from '../../components/AccountCard';
import './style';

@inject('accountStore')
@observer
export default class AccountPreview extends Component {
    @autobind
    deleteAccount(account) {
        console.log(account, this.props);
    }

    render() {
        const { accountStore } = this.props;

        return (
            <div className="account-container">
                <PreviewHeader cions={9} />
                <section className="account-list">
                    {
                        accountStore.accounts.toJS().map((account, index) => <AccountCard key={index} link="/account" onConfirm={this.deleteAccount} account={account} />)
                    }
                </section>
            </div>
        );
    }
}
