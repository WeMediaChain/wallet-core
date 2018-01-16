import React, { Component } from 'react';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { Icon, Input, Table } from 'antd';
import { store } from './mobx';

import './style';

@observer
export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.input = null;

        this.state = {
            text: '',
        };
    }

    @autobind
    onChangeText(e) {
        this.setState({ text: e.target.value });
    }

    @autobind
    clearInput() {
        this.setState({ text: '' });
    }

    render() {
        const { text } = this.state,
            { addItem, lists, columns } = store,
            suffix = text ? <Icon type="close-circle" onClick={this.clearInput} /> : null;

        return (
            <div>
                <Input
                    placeholder="Enter something"
                    prefix={<Icon type="edit" />}
                    suffix={suffix}
                    value={text}
                    onChange={this.onChangeText}
                    /* eslint-disable no-return-assign */
                    ref={node => this.input = node}
                    onPressEnter={addItem}
                />
                <Table
                    className="table"
                    dataSource={lists.toJS()}
                    columns={columns} />
            </div>
        );
    }
}
