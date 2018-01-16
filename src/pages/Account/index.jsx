import React, { Component } from 'react';
import { Icon } from 'antd';
import './style';
// import { rpc } from '../../utils/rpc';

/* eslint-disable */
export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
        };
    }
    componentWillMount() {
        // console.log(rpc);
        this.fetchList();
    }

    async fetchList() {
        // const address = '0x243F7F63bc673056D8d2a2c1e31776561Dd7f708',
        //     balance = await rpc.balanceOf(address),
        //     transactions = await rpc.transactions(address);
        const transactions = [{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708"],"data":"0x0000000000000000000000000000000000000000000000056bc75e2d63100000","blockNumber":"0x18560f","transactionHash":"0xefdf6c766ee43e9a05f19ac0fa44f72921313c6bdd5c1ad96506f40c80421fb2","transactionIndex":"0xd","blockHash":"0xa3bddceccbb4311da420ceb8353b3f27fcf571c1f4d95c16f1880423b19d00a3","logIndex":"0x7","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708"],"data":"0x00000000000000000000000000000000000000000000021e19e0c9bab2400000","blockNumber":"0x185613","transactionHash":"0xfb98506a2c61c3004725f656f2af01a7da1db5abbb6fe0ce6cce7026e8b258f3","transactionIndex":"0xc","blockHash":"0x302815dd27eec847dea3419c593fbb2259ce7683cfae9104360693e430ab1c45","logIndex":"0x6","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000056bc75e2d63100000","blockNumber":"0x1856e0","transactionHash":"0xca3178251503f94032d6034512909c2040fda1b86bb567491ccc3d62833deefd","transactionIndex":"0x4","blockHash":"0x77fe0f8351418baa0d82bea7141cde2efb22022f74a52f7a32387a98b674ec29","logIndex":"0x4","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x000000000000000000000000508eff592ecadf1e50de5688c8e64778050f3025"],"data":"0x00000000000000000000000000000000000000000000003635c9adc5dea00000","blockNumber":"0x185818","transactionHash":"0xc54a1bde1abaccd4ba752095cd791536f5a21ab8d7369f6d9055c29c23fb357e","transactionIndex":"0x4","blockHash":"0x6eafb96adc71547fdaa16d999dc6b435e3b561a30adaaf62feb15bb217ffe2a6","logIndex":"0x3","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000","blockNumber":"0x185b1a","transactionHash":"0x2fb844d148f9ffd992cc11f2224d6781f604b1c05e247fd8e7a2f6ae992d0bc7","transactionIndex":"0x0","blockHash":"0x1c00a4675667f7ce546721b63bf7c491ea78e7e8e6979d8ad8b18370601fcc13","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000","blockNumber":"0x185b1d","transactionHash":"0x487373abd446bd1bdb7e2fb388b17d330232c03f010cdcd3159bccae2e3cce4b","transactionIndex":"0x1","blockHash":"0x532acaa3300c6ba1e7a7f4effcdb905b18308174d51f1afe4eaac5700a5a38d7","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000","blockNumber":"0x185b22","transactionHash":"0x9dca49e145c7fd7d2cf7bce6851a325f7d26a7571266cec9d86d2261d750b5c2","transactionIndex":"0x1","blockHash":"0xcad2aa4e0ad1f4e4657f1216c12bd5d6401eae9c65c9c6157fc23cc82779c9e7","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000000de0b6b3a7640000","blockNumber":"0x185b24","transactionHash":"0x39aae66f801154be8167bf388d33c2c5c60c0af401dd4cea426ed31d8e639473","transactionIndex":"0x0","blockHash":"0x8cbaf64051a1ee4176ed112beeea4c5025c804771ebe133ea5a4cb1826cb84da","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x000000000000000000000000243f7f63bc673056d8d2a2c1e31776561dd7f708","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000001111d67bb1bb0000","blockNumber":"0x185b50","transactionHash":"0xb2140f5768f5c88c12e847c4cbbcfe104be236f816373f28a1df71dc044a6f57","transactionIndex":"0x1","blockHash":"0x4fb93aad1b73ad595c048dc2f97c8f5969b911de8a1203f3215ad8d1450d15fb","logIndex":"0x3","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x000000000000000000000000000000083c652c8578aed919d0098d04305996c4"],"data":"0x00000000000000000000000000000000000000000000021e19e0c9bab2400000","blockNumber":"0x185c0b","transactionHash":"0x328f62a3f4c08f2024959de36c55d2bf5905367548b5aff62e1dcee2f353b1d2","transactionIndex":"0x2","blockHash":"0xf3ada0ea3beb4171c3cfac876c6baee7f42f6479edb83ca64ec16707bf22e4d0","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x000000000000000000000000000000083c652c8578aed919d0098d04305996c4"],"data":"0x0000000000000000000000000000000000000000000010f0cf064dd592000000","blockNumber":"0x186c4c","transactionHash":"0xf969dbada3cfafd0d5c00e6fa34b8ea0450035ee8e723fd9e7fa93a6f763fa96","transactionIndex":"0x2","blockHash":"0x1974be22fdcfb6f3c3a764851a4eab54607ffd116090423767de98161657d088","logIndex":"0x6","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x000000000000000000000000000000083c652c8578aed919d0098d04305996c4"],"data":"0x0000000000000000000000000000000000000000000010f0cf064dd592000000","blockNumber":"0x186c5c","transactionHash":"0xba6451c8de7e11eec0b943916fef3edcef5ca3ebf896da2ba562fc0885efa2af","transactionIndex":"0x0","blockHash":"0x364b84abe5b56237e1fa9d9e27e1b6cef2f899c0e9f1f3c051a50326391d7c49","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x000000000000000000000000000000083c652c8578aed919d0098d04305996c4"],"data":"0x00000000000000000000000000000000000000000000002b5e3af16b18800000","blockNumber":"0x186c5c","transactionHash":"0xe375de6242739132f89ade289138752a1291feb3fa1f73f316212421113d8c67","transactionIndex":"0x1","blockHash":"0x364b84abe5b56237e1fa9d9e27e1b6cef2f899c0e9f1f3c051a50326391d7c49","logIndex":"0x1","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b","0x00000000000000000000000028025378d9a980323d2242c1c82297d54bd08932"],"data":"0x00000000000000000000000000000000000000000000002b5e3af16b18800000","blockNumber":"0x186c5e","transactionHash":"0x58078f053041c1a490884dad168d9f923252d01d95b82ae6cdc1f9cbc8456f01","transactionIndex":"0x0","blockHash":"0x0f420ffe9983692d6f58f44f6c0a130cbb404a0de7924b5cd63b9465bd5a9604","logIndex":"0x0","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000028025378d9a980323d2242c1c82297d54bd08932","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000000000000000000001","blockNumber":"0x186c61","transactionHash":"0xdac9f6115ccaa00c7cf6565e4aff4a1bbf769d8d80c98f740fc3bfd4328f96c6","transactionIndex":"0x2","blockHash":"0x7c93615e9a6f79014d0b7ca0f6f2523c1cd9903b5aebea2d042ad8078c2ce732","logIndex":"0x2","removed":false},{"address":"0x71390ad7724bc0c478c19531e389978f97cbb877","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x00000000000000000000000028025378d9a980323d2242c1c82297d54bd08932","0x00000000000000000000000050ecae1e5425b39c15f8cbec8a56d64355e0cc9b"],"data":"0x0000000000000000000000000000000000000000000000000000000000000002","blockNumber":"0x1870d9","transactionHash":"0x89081afc66fc4229900bb3da19ed5a51b51d1f0f735a1e4ea9474826018a79e0","transactionIndex":"0x3","blockHash":"0x42f8e9b482f8c3b2a043e6af1d0d3b29306a766a432627838c2ee95c14eaa3a5","logIndex":"0x5","removed":false}];
        this.setState({ transactions });
        // console.log(balance, transactions, this.props);
    }

    render() {
        const { params } = this.props.match,
            { transactions } = this.state;

        console.log(params.address, transactions);
        return (
            <div className="account-list-container">
                <header className="account-list-header">
                    <p className="account-name">
                        <span>测试账户</span>
                        <Icon type="edit" />
                    </p>
                    <p className="account-cions">1.00</p>
                    <p className="account-by">WMC</p>
                    <p className="account-key">
                        <span>0x92b748bb6cf3bbe5d0c3409ebbcd22a33fe5eb17</span>
                        <Icon type="copy" className="icon" />
                    </p>
                    <p className="account-trans">发起转账</p>
                    <div className="account-action">
                        <div className="item">
                            <Icon type="qrcode" className="icon" />
                            <p>二维码</p>
                        </div>
                        <div className="item">
                            <Icon type="reload" className="icon" />
                            <p>刷新</p>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
