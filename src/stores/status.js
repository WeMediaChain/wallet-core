import { observable, action } from 'mobx';

class StatusStore {
    @observable transferModal = false;
    @observable isRefresh = false;
    @observable isAccountTableLoading = false;
    @observable confirmPwdModal = false;

    @action('toggle transfer modal')
    toggleTransfer() {
        this.transferModal = !this.transferModal;
    }

    @action('toggle refresh')
    toggleRefresh() {
        this.isRefresh = !this.isRefresh;
    }

    @action('toggle account table status')
    toggleAccountTableStatus() {
        this.isAccountTableLoading = !this.isAccountTableLoading;
    }

    @action('toggle confirm password modal')
    toggleConfirmPasswordStatus() {
        this.confirmPwdModal = !this.confirmPwdModal;
    }
}

export const statusStore = new StatusStore();
