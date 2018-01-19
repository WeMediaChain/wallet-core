import { observable, action } from 'mobx';
import { remote } from 'electron';
import { message } from 'antd';
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
    @observable walletsMap = {};
    @observable currentShowAccount = {
        name: '-',
        balance: 0,
        transactions: [],
    };
    @observable accountMenus = [
        {
            path: '/',
            text: '账户总览',
            icon: 'wallet',
        },
    ];
    @observable transferInfo = { fee: 0.01 };
    @observable isTransferProgress = false;

    constructor() {
        this.loadAccountConfig();
    }

    @action('set page params')
    loadAccountConfig() {
        const walletsMap = {},
            accountMenus = [
                {
                    path: '/',
                    text: '账户总览',
                    icon: 'wallet',
                },
            ];
        fs.readdirSync(WALLETS_PATH).forEach(async (file, index) => {
            try {
                const v3 = JSON.parse(fs.readFileSync(`${WALLETS_PATH}/${file}`, 'utf-8')),
                    address = `0x${v3.address}`;

                walletsMap[address] = {
                    w: JSON.parse(JSON.stringify(v3)),
                    address,
                    name: address.slice(-4),
                    balance: 0,
                    index: index + 1,
                    transactions: [],
                };
                accountMenus.push(
                    {
                        path: `/account/${address}`,
                        text: address.slice(-4),
                        icon: 'solution',
                    },
                );
            } catch (err) {
                console.error(err);
            }
        });
        this.walletsMap = walletsMap;
        this.accountMenus = accountMenus;
        this.fetchAsyncData();
    }

    @action('update wallet asynchronous data')
    fetchAsyncData() {
        Object.keys(this.walletsMap).forEach(async (address) => {
            this.walletsMap[address] = {
                ...this.walletsMap[address],
                balance: await rpc.balanceOf(address),
                transactions: await rpc.transactions(address),
            };
        });
    }

    @action('set current show account')
    setCurrentShowAccount(address) {
        this.currentShowAccount = this.walletsMap[address];
    }

    @action('create account')
    async createAccount(param) {
        try {
            const account = rpc.eth.accounts.create().encrypt(param.password),
                address = `0x${account.address}`,
                totoalAccount = this.walletsMap.length;
            await createWalletFile(address, account);

            this.walletsMap[address] = {
                w: account,
                address,
                name: address.slice(-4),
                balance: await rpc.balanceOf(address),
                index: totoalAccount + 1,
                transactions: await rpc.transactions(address),
            };
        } catch (err) {
            console.error(err);
        }
    }

    @action('delete account')
    async deleteAccount({ address }) {
        try {
            await removeWalletFile(address);
            delete this.walletsMap[address];
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

            // update account data
            this.walletsMap[address] = {
                ...this.walletsMap[address],
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
                obj = this.walletsMap[tranferAddress].w,
                w = rpc.wallet(obj, password);

            await rpc.transfer(w, address, parseFloat(money));
            this.fetchTransferList(tranferAddress);
            this.isTransferProgress = false;
            message.success('转账成功');
        } catch (err) {
            message.error('转账失败');
        }
    }
}

export const accountStore = new Accounts();
