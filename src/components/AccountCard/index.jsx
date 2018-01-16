import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'proptypes';
import './style';

export default class AccountCard extends Component {
    static propTypes = {
        account: PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]),
            name: PropTypes.string.isRequired,
            cions: PropTypes.number.isRequired,
            key: PropTypes.string.isRequired,
        }).isRequired,
    };

    render() {
        const { id, name, cions, key } = this.props.account,
            showID = id > 9 ? id : `0${id}`;

        return (
            <section className="account-block">
                <p className="account-id">{showID}</p>
                <Icon type="delete" className="account-remove" />
                <div className="account-content">
                    <p className="account-name">{name}</p>
                    <p className="account-cions">{cions}</p>
                    <p className="account-by">币</p>
                    <p className="account-key">{key}</p>
                </div>
            </section>
        );
    }
}
