import React, { Component } from 'react';
import classname from 'classnames';
import PropTypes from 'proptypes';
import { observer, inject } from 'mobx-react';
import './style.scss';

@inject('statusStore')
@observer
export default class Toast extends Component {
    static propTypes = {
        statusStore: PropTypes.shape({
            toastModal: PropTypes.bool.isRequired,
            toastMessage: PropTypes.string.isRequired,
        }).isRequired,
    };

    static defaultProps = {
        statusStore: {
            toastModal: false,
            toastMessage: '',
        },
    };

    render() {
        const { toastModal, toastMessage } = this.props.statusStore;

        return (
            <div className={classname({
                'toast-container': true,
                show: toastModal,
            })}>
                {toastMessage}
            </div>
        );
    }
}
