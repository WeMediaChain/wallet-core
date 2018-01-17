import { observable, action, computed } from 'mobx';

class Accounts {
    @observable
    accounts = [
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
            key: '0x243F7F63bc673056D8d2a2c1e31776561Dd7f708',
        },
        {
            id: 4,
            name: '账户4',
            cions: 32,
            key: '0x71390Ad7724BC0c478C19531E389978F97cBB877',
        },
    ];

    @computed
    get accountMenus() {
        const previewMenu = {
                path: '/',
                text: '账户总览',
                icon: 'wallet',
            },
            accountMenus = this.accounts.map(account => ({
                id: account.id,
                path: `/account/${account.key}`,
                text: account.name,
                icon: 'solution',
            }));

        return [previewMenu, ...accountMenus];
    }

    @action('create account')
    createAccount(param) {
        console.log('input params', param);
        const lastAccountID = this.accounts[this.accounts.length - 1].id,
            tempAccount = {
                id: lastAccountID + 1,
                name: `账户${lastAccountID + 1}`,
                cions: 23,
                key: '0x243F7F63bc673056D8d2a2c1e31776561Dd7f708',
            };
        this.accounts.push(tempAccount);
    }

    @action('delete account')
    deleteAccount({ id }) {
        const index = this.accounts.findIndex(account => account.id === id);
        this.accounts.splice(index, 1);
    }
}

export const accountStore = new Accounts();