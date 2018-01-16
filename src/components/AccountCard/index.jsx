import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
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
        link: PropTypes.string.isRequired,
        deleteCallBack: PropTypes.func.isRequired,
    };

    static defaultProps = {
        account: {
            id: 1,
            name: '',
            cions: 0,
            key: '',
        },
        link: '',
        deleteCallBack: null,
    };

    execCallBack(e) {
        e.preventDefault();
        const { deleteCallBack, account } = this.props;
        deleteCallBack(account);
    }

    render() {
        const { account, link } = this.props,
            { id, name, cions, key } = account,
            showID = id > 9 ? id : `0${id}`;

        return (
            <Link className="account-block" to={`${link}/${key}`}>
                <p className="account-id">{showID}</p>
                <Icon type="delete" className="account-remove" onClick={e => this.execCallBack(e)} />
                <div className="account-content">
                    <p className="account-name">{name}</p>
                    <p className="account-cions">{cions}</p>
                    <p className="account-by">币</p>
                    <p className="account-key">{key}</p>
                </div>
            </Link>
        );
    }
}
