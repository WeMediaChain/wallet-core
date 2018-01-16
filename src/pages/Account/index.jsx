import React, { Component } from 'react';

export default class Account extends Component {
    render() {
        const { params } = this.props.match;
        return (
            <div>账户：{params.address}</div>
        );
    }
}
