import { observable, action } from 'mobx';

class StatusStore {
    @observable transferModal = false;
    @observable isRefresh = false;

    @action('toggle transfer modal')
    toggleTransfer() {
        this.transferModal = !this.transferModal;
    }

    @action('toggle refresh')
    toggleRefresh(status) {
        this.isRefresh = status === undefined ? !this.isRefresh : status;
    }
}

export const statusStore = new StatusStore();
