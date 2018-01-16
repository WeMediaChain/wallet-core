/* eslint-disable */
const ethereumjsTx = require('ethereumjs-tx');
// import ethereumjsTx from 'ethereumjs-tx';
const ethereumjsWallet = require('ethereumjs-wallet');
// import ethereumjsWallet from 'ethereumjs-wallet';
const ethereumjsABI = require('ethereumjs-abi');
const Web3 = require('web3');
// import ethereumjsABI from 'ethereumjs-abi';
// import Web3 from 'web3';

const URL = 'http://47.104.143.109:8545/',
    contractAddress = '0x71390Ad7724BC0c478C19531E389978F97cBB877',
    web3 = new Web3(),
    wallet = (w, pwd) => ethereumjsWallet.fromV3(w, pwd),
    wmcABI = [
        {
            constant: true,
            inputs: [],
            name: "totalSupply",
            outputs: [
                {
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        }, {
            constant: true,
            inputs: [],
            name: "symbol",
            outputs: [
                {
                    name: "",
                    type: "string"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        }, {
            constant: true,
            inputs: [],
            name: "name",
            outputs: [
                {
                    name: "",
                    type: "string"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        }, {
            constant: true,
            inputs: [],
            name: "decimals",
            outputs: [
                {
                    name: "",
                    type: "uint8"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        }, {
            constant: true,
            inputs: [
                {
                    name: "",
                    type: "address"
                }, {
                    name: "",
                    type: "address"
                }
            ],
            name: "allowance",
            outputs: [
                {
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        }, {
            constant: true,
            inputs: [
                {
                    name: "",
                    type: "address"
                }
            ],
            name: "balanceOf",
            outputs: [
                {
                    name: "",
                    type: "uint256"
                }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
        }, {
            inputs: [
                {
                    name: "initialSupply",
                    type: "uint256"
                }, {
                    name: "tokenName",
                    type: "string"
                }, {
                    name: "tokenSymbol",
                    type: "string"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "constructor"
        }, {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "from",
                    type: "address"
                }, {
                    indexed: false,
                    name: "value",
                    type: "uint256"
                }
            ],
            name: "Burn",
            type: "event"
        }, {
            constant: false,
            inputs: [
                {
                    name: "_from",
                    type: "address"
                }, {
                    name: "_to",
                    type: "address"
                }, {
                    name: "_value",
                    type: "uint256"
                }
            ],
            name: "transferFrom",
            outputs: [
                {
                    name: "success",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }, {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    name: "from",
                    type: "address"
                }, {
                    indexed: true,
                    name: "to",
                    type: "address"
                }, {
                    indexed: false,
                    name: "value",
                    type: "uint256"
                }
            ],
            name: "Transfer",
            type: "event"
        }, {
            constant: false,
            inputs: [
                {
                    name: "_from",
                    type: "address"
                }, {
                    name: "_value",
                    type: "uint256"
                }
            ],
            name: "burnFrom",
            outputs: [
                {
                    name: "success",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }, {
            constant: false,
            inputs: [
                {
                    name: "_spender",
                    type: "address"
                }, {
                    name: "_value",
                    type: "uint256"
                }
            ],
            name: "approve",
            outputs: [
                {
                    name: "success",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }, {
            constant: false,
            inputs: [
                {
                    name: "_spender",
                    type: "address"
                }, {
                    name: "_value",
                    type: "uint256"
                }, {
                    name: "_extraData",
                    type: "bytes"
                }
            ],
            name: "approveAndCall",
            outputs: [
                {
                    name: "success",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }, {
            constant: false,
            inputs: [
                {
                    name: "_to",
                    type: "address"
                }, {
                    name: "_value",
                    type: "uint256"
                }
            ],
            name: "transfer",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }, {
            constant: false,
            inputs: [
                {
                    name: "_value",
                    type: "uint256"
                }
            ],
            name: "burn",
            outputs: [
                {
                    name: "success",
                    type: "bool"
                }
            ],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
        }
    ],
    { eth } = web3,
    contract = new web3.eth.Contract(wmcABI, contractAddress);

eth.setProvider(URL);
contract.setProvider(URL);

export const rpc = {
    wallet,
    web3: web3.utils,
    eth,
    contract,
    async balanceOf(address) {
        console.log(address, '=======');
        const balance = await contract.methods.balanceOf(address).call();
        return web3.utils.fromWei(balance)
    },
    async transactions(address) {
        return await rpc.contract.getPastEvents('Transfer',{
            filter: {},
            fromBlock: 0,
            toBlock: 'latest'
        });
    },
    async transfer (w, to, value, gasPrice, gasLimit) {
        const data = contract.methods.transfer(to, value).encodeABI(),
            nonce = await eth.getTransactionCount(w.getAddressString()),
            txParams = {
                nonce: web3.utils.toHex(nonce),
                gasPrice: gasPrice || '0x4a817c800',
                gasLimit: gasLimit || '0x1d8a8',
                to: contractAddress,
                value: '0x00',
                data: data,
            },
             tx = new ethereumjsTx(txParams),
            serializedTx = tx.serialize();

        tx.sign(w.getPrivateKey())
        console.log(serializedTx.toString('hex'))
        return await eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    }
};
