import { observable, action, computed } from 'mobx';
import { remote } from 'electron';
import { statusStore } from './status';
import { rpc } from '../utils/rpc';

/* eslint-disable one-var */
const fs = remote.require('fs');

class Accounts {
    @observable
    wallets = [];
    @observable
    balance = 0;
    @observable
    transactions = [];
    
    constructor() {
        this.loadAccountConfig();
    }
    
    loadAccountConfig() {
        this.wallets = fs.readdirSync('./keystore').map((file, index) => {
            const v3 = JSON.parse(fs.readFileSync(`./keystore/${file}`, 'utf-8'));
            
            // todo 先这样，之后调整
            v3.name = v3.address.slice(-4);
            v3.cions = 0;
            v3.index = index + 1;
            v3.address = `0x${v3.address}`;
            
            return v3;
        });
    }
    
    @computed
    get accountMenus() {
        const previewMenu = {
                path: '/',
                text: '账户总览',
                icon: 'wallet',
            },
            accountMenus = this.wallets.map(wallet => ({
                path: `/account/${wallet.address}`,
                text: wallet.name,
                icon: 'solution',
            }));

        return [previewMenu, ...accountMenus];
    }
    
    @action('create account')
    createAccount(param) {
        console.log('input params', param, this.wallets);
        // const lastAccountID = this.accounts[this.accounts.length - 1].id,
        //     tempAccount = {
        //         id: lastAccountID + 1,
        //         name: `账户${lastAccountID + 1}`,
        //         cions: 23,
        //         key: '0x243F7F63bc673056D8d2a2c1e31776561Dd7f708',
        //     };
        // this.accounts.push(tempAccount);
    }
    
    @action('delete account')
    deleteAccount({ id }) {
        console.log('delete', id, this.wallets);
        // const index = this.accounts.findIndex(account => account.id === id);
        // this.accounts.splice(index, 1);
    }
    
    @action('fetch transfer list')
    async fetchTransferList(address, isRefresh = false) {
        try {
            // reset page data while fetch
            if (!isRefresh) {
                this.balance = 0;
                this.transactions = [];
            }
            
            // toggle status
            statusStore.toggleAccountTableStatus();
            statusStore.toggleRefresh(isRefresh);
            
            this.balance = await rpc.balanceOf(address);
            this.transactions = await rpc.transactions(address);
            
            statusStore.toggleRefresh(false);
            statusStore.toggleAccountTableStatus();
        } catch (err) {
            statusStore.toggleRefresh(false);
            statusStore.toggleAccountTableStatus();
        }
    }
}

export const accountStore = new Accounts();
