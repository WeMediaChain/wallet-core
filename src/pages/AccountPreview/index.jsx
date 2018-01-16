import React, { Component } from 'react';

import './style';

export default class AccountPreview extends Component {
    render() {
        return (
            <div className="account-container">
                <header>
                    <p className="text">目前总共获取</p>
                    <p className="number">1</p>
                    <p className="text">币</p>
                </header>
            </div>
        );
    }
}
