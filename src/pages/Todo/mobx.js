/**
 * Created by Min on 2017/11/28.
 */
import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

class Todo {
    @observable lists = [];
    @observable.ref columns = [
        {
            title: 'TEXT',
            dataIndex: 'text',
        },
    ];
    
    @autobind
    @action('add item')
    addItem(e) {
        const { lists } = this;
        this.lists = [...lists, {
            key: Date.now(),
            expired: false,
            text: e.target.value,
        }];
    }
}

export const store = new Todo();
