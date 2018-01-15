// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var ethereumjsTx = require('./node_modules/ethereumjs-tx')
var ethereumjsWallet = require('./node_modules/ethereumjs-wallet')
var ethereumjsABI = require("./node_modules/ethereumjs-abi")
var Web3 = require('./node_modules/web3')
var web3 = new Web3()
var wallet = function (w, pwd) {
    return ethereumjsWallet.fromV3(w, pwd)
}
var contractAddress = "0x71390Ad7724BC0c478C19531E389978F97cBB877"
var wmcABI = [{ constant: true, inputs: [], name: "totalSupply", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" }, { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" }, { constant: true, inputs: [], name: "name", outputs: [{ name: "", type: "string" }], payable: false, stateMutability: "view", type: "function" }, { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], payable: false, stateMutability: "view", type: "function" }, { constant: true, inputs: [{ name: "", type: "address" }, { name: "", type: "address" }], name: "allowance", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" }, { constant: true, inputs: [{ name: "", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], payable: false, stateMutability: "view", type: "function" }, { inputs: [{ name: "initialSupply", type: "uint256" }, { name: "tokenName", type: "string" }, { name: "tokenSymbol", type: "string" }], payable: false, stateMutability: "nonpayable", type: "constructor" }, { anonymous: false, inputs: [{ indexed: true, name: "from", type: "address" }, { indexed: false, name: "value", type: "uint256" }], name: "Burn", type: "event" }, { constant: false, inputs: [{ name: "_from", type: "address" }, { name: "_to", type: "address" }, { name: "_value", type: "uint256" }], name: "transferFrom", outputs: [{ name: "success", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function" }, { anonymous: false, inputs: [{ indexed: true, name: "from", type: "address" }, { indexed: true, name: "to", type: "address" }, { indexed: false, name: "value", type: "uint256" }], name: "Transfer", type: "event" }, { constant: false, inputs: [{ name: "_from", type: "address" }, { name: "_value", type: "uint256" }], name: "burnFrom", outputs: [{ name: "success", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: false, inputs: [{ name: "_spender", type: "address" }, { name: "_value", type: "uint256" }], name: "approve", outputs: [{ name: "success", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: false, inputs: [{ name: "_spender", type: "address" }, { name: "_value", type: "uint256" }, { name: "_extraData", type: "bytes" }], name: "approveAndCall", outputs: [{ name: "success", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: false, inputs: [{ name: "_to", type: "address" }, { name: "_value", type: "uint256" }], name: "transfer", outputs: [], payable: false, stateMutability: "nonpayable", type: "function" }, { constant: false, inputs: [{ name: "_value", type: "uint256" }], name: "burn", outputs: [{ name: "success", type: "bool" }], payable: false, stateMutability: "nonpayable", type: "function" }];

var eth = web3.eth
eth.setProvider("http://47.104.143.109:8545/")
var contract = new web3.eth.Contract(wmcABI, contractAddress)
contract.setProvider("http://47.104.143.109:8545/")
var totalSupply = contract.methods.totalSupply;
var balanceOf = contract.methods.balanceOf;
totalSupply().call().then((amount) => {
    console.log("totalSuppy", web3.utils.fromWei(amount))
})

balanceOf("0x243F7F63bc673056D8d2a2c1e31776561Dd7f708").call().then((amount) => {
    console.log("balanceOf", "0x243F7F63bc673056D8d2a2c1e31776561Dd7f708", web3.utils.fromWei(amount))
})


var rpc = {
    wallet: wallet,
    web3: web3.utils,
    eth: eth,
    contract: contract,
    balanceOf: async function (address) {
        var balance = await contract.methods.balanceOf(address).call()
        return web3.utils.fromWei(balance)
    },
    transactions: async function (address) {
        return await rpc.contract.getPastEvents('Transfer', {
            filter: {},
            fromBlock: 0,
            toBlock: 'latest'
        }, function (error, events) { console.log(events); })
    },
    transfer: async function (w, to, value, gasPrice, gasLimit) {
        const data = contract.methods.transfer(to, value).encodeABI()
        const nonce = await eth.getTransactionCount(w.getAddressString())
        const txParams = {
            nonce: web3.utils.toHex(nonce),
            gasPrice: gasPrice || '0x4a817c800',
            gasLimit: gasLimit || '0x1d8a8',
            to: contractAddress,
            value: '0x00',
            data: data,
        }
        const tx = new ethereumjsTx(txParams)
        tx.sign(w.getPrivateKey())
        const serializedTx = tx.serialize()
        console.log(serializedTx.toString('hex'))
        return await eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))

    }
}

window.rpc = rpc

var address = "0x243F7F63bc673056D8d2a2c1e31776561Dd7f708"
rpc.balanceOf(address).then((balance) => {
    rpc.transactions(address).then((transactions) => {
        console.log(balance, transactions)
        document.write("<p>address:" + address + "</p>")
        document.write("<p>balance:" + balance + "WMC</p>")
        transactions.forEach((event) => {
            document.write("<p>" + event.returnValues.from + " transfer to " + event.returnValues.to + ":" + rpc.web3.fromWei(event.returnValues.value) + "WMC" + "</p>")
        })
    })
})


