/* eslint-disable one-var */
import { observable, action, computed } from 'mobx';
import { message } from 'antd';
import { statusStore } from './status';
import { rpc } from '../utils/rpc';

const { remote } = window.require('electron');
const fs = window.require('fs'),
    path = window.require('path'),
    APP_PATH = path.normalize(remote.app.getAppPath()),
    WALLETS_PATH = `${APP_PATH}/keystore`;

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
    @observable walletsMap = [];
    @observable currentShowAccount = {
        name: '-',
        balance: 0,
        transactions: [],
    };
    @observable transferInfo = { fee: 0.01 };
    @observable isTransferProgress = false;
    
    constructor() {
        this.loadAccountConfig();
    }
    
    @action('set page params')
    loadAccountConfig() {
        try {
            // check keystore dir is exist
            if (!fs.existsSync(WALLETS_PATH)) {
                fs.mkdirSync(WALLETS_PATH);
            }
            
            const walletsMap = [];
            fs.readdirSync(WALLETS_PATH).forEach(async (file, index) => {
                try {
                    const v3 = JSON.parse(fs.readFileSync(`${WALLETS_PATH}/${file}`, 'utf-8')),
                        address = `0x${v3.address}`;
                    
                    walletsMap.push({
                        w: JSON.parse(JSON.stringify(v3)),
                        address,
                        name: address.slice(-4),
                        balance: 0,
                        index: index + 1,
                        transactions: [],
                    });
                } catch (err) {
                    console.error(err);
                }
            });
            this.walletsMap = walletsMap;
            this.fetchAsyncData();
        } catch (err) {
            console.error(err);
        }
    }
    
    @computed
    get accountMenus() {
        const defaultMenu = {
                path: '/',
                text: '账户总览',
                icon: 'wallet',
            },
            menus = this.walletsMap.map(({ address }) => ({
                path: `/account/${address}`,
                text: address.slice(-4),
                icon: 'solution',
            }));
        
        return [defaultMenu, ...menus];
    }
    
    @computed
    get totalAccount() {
        let total = 0;
        this.walletsMap.forEach(({ balance }) => {
            total += parseFloat(balance);
        });
        return total;
    }
    
    @action('update wallet asynchronous data')
    fetchAsyncData() {
        this.walletsMap.forEach(async (wallet, index) => {
            this.walletsMap[index] = {
                ...wallet,
                balance: await rpc.balanceOf(wallet.address),
                transactions: await rpc.transactions(wallet.address),
            };
        });
    }
    
    @action('set current show account')
    setCurrentShowAccount(address) {
        this.currentShowAccount = this.walletsMap.filter(wallet => wallet.address === address)[0];
    }
    
    @action('create account')
    async createAccount(param) {
        try {
            const account = rpc.eth.accounts.create().encrypt(param.password),
                address = `0x${account.address}`,
                totoalAccount = this.walletsMap.length;
            await createWalletFile(address, account);
            
            this.walletsMap.push({
                w: account,
                address,
                name: address.slice(-4),
                balance: 0,
                index: totoalAccount + 1,
                transactions: [],
            });
        } catch (err) {
            console.error(err);
        }
    }
    
    @action('delete account')
    async deleteAccount({ address }) {
        try {
            await removeWalletFile(address);
            const index = this.walletsMap.findIndex(wallet => wallet.address === address);
            this.walletsMap.splice(index, 1);
        } catch (err) {
            console.error(err);
        }
    }
    
    @action('fetch transfer list')
    async fetchTransferList(address) {
        try {
            // toggle status
            statusStore.toggleAccountTableStatus();
            statusStore.toggleRefresh();
            
            // find wallet index
            const index = this.walletsMap.findIndex(wallet => wallet.address === address);
            
            // update account data
            this.walletsMap[index] = {
                ...this.walletsMap[index],
                balance: await rpc.balanceOf(address),
                transactions: await rpc.transactions(address),
            };
            
            statusStore.toggleRefresh();
            statusStore.toggleAccountTableStatus();
        } catch (err) {
            statusStore.toggleRefresh();
            statusStore.toggleAccountTableStatus();
        }
    }
    
    @action('set transfer info')
    setTransferInfo(info) {
        this.transferInfo = { ...this.transferInfo, ...info };
    }
    
    @action('start transfer money')
    async startTransfer() {
        if (this.isTransferProgress) {
            message.success('上次转帐尚未完成，请完成后再进行转账');
            return;
        }
        
        try {
            this.isTransferProgress = true;
            const { tranferAddress, password, address, money } = this.transferInfo,
                obj = this.walletsMap.filter(wallet => wallet.address === tranferAddress)[0].w,
                w = rpc.wallet(obj, password);
            
            await rpc.transfer(w, address, parseFloat(money));
            this.fetchTransferList(tranferAddress);
            this.isTransferProgress = false;
            message.success('转账成功');
        } catch (err) {
            message.error('转账失败');
            this.isTransferProgress = false;
        }
    }
}

export const accountStore = new Accounts();
