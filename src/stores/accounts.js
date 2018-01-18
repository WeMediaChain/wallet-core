import { observable, action, computed } from 'mobx';
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
    @observable.shallow
    walletsMap = {};
    @observable
    wallets = [];
    @observable
    balance = 0;
    @observable
    transactions = [];
    @observable
    transferInfo = { fee: 0.01 };

    constructor() {
        this.loadAccountConfig();
    }

    loadAccountConfig() {
        const walletsMap = {};
        this.wallets = fs.readdirSync(WALLETS_PATH).map((file, index) => {
            try {
                const v3 = JSON.parse(fs.readFileSync(`${WALLETS_PATH}/${file}`, 'utf-8')),
                    wallet = JSON.parse(JSON.stringify(v3));

                walletsMap[`0x${v3.address}`] = v3;

                // todo 先这样，之后调整
                wallet.name = wallet.address.slice(-4);
                wallet.cions = 0;
                wallet.index = index + 1;
                wallet.address = `0x${wallet.address}`;

                return wallet;
            } catch (err) {
                return {};
            }
        });
        this.walletsMap = walletsMap;
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

    @action('set transfer info')
    setTransferInfo(info) {
        this.transferInfo = { ...this.transferInfo, ...info };
    }

    @action('start transfer money')
    async startTransfer() {
        try {
            const { tranferAddress, password, address, money } = this.transferInfo,
                obj = this.walletsMap[tranferAddress],
                w = rpc.wallet(obj, password);

            await rpc.transfer(w, address, parseFloat(money));
            this.fetchTransferList(tranferAddress);
            message.success('转账成功');
        } catch (err) {
            message.error('转账失败');
        }
    }
}

export const accountStore = new Accounts();
