import { observable, action, computed } from 'mobx';
import { remote } from 'electron';
import { statusStore } from './status';
import { rpc } from '../utils/rpc';

/* eslint-disable one-var */
const fs = remote.require('fs'),
    WALLETS_PATH = './keystore';

function createWalletFile(fileName, context) {
    return new Promise((rs, rj) =>
        fs.writeFile(
            `${WALLETS_PATH}/${fileName}.json`,
            JSON.stringify(context),
            { flag: 'w+', encoding: 'utf8' },
            (err) => (err ? rj(err) : rs()),
        ),
    );
}

function removeWalletFile(address) {
    return new Promise((rs, rj) =>
        fs.unlink(
            `${WALLETS_PATH}/${address}.json`,
            (err) => (err ? rj(err) : rs())),
    );
}

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
        this.wallets = fs.readdirSync(WALLETS_PATH).map((file, index) => {
            try {
                const v3 = JSON.parse(fs.readFileSync(`${WALLETS_PATH}/${file}`, 'utf-8'));
                
                // todo 先这样，之后调整
                v3.name = v3.address.slice(-4);
                v3.cions = 0;
                v3.index = index + 1;
                v3.address = `0x${v3.address}`;
                
                return v3;
            } catch (err) {
                console.error(err);
                return {};
            }
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
    async createAccount(param) {
        try {
            const account = rpc.eth.accounts.create().encrypt(param.password);
            await createWalletFile(`0x${account.address}`, account);
            this.loadAccountConfig();
        } catch (err) {
            console.error(err);
        }
    }
    
    @action('delete account')
    async deleteAccount({ address }) {
        try {
            await removeWalletFile(address);
            this.loadAccountConfig();
        } catch (err) {
            console.error(err);
        }
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
