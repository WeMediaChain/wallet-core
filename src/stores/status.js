import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

class StatusStore {
    @observable transferModal = false;
    @observable isRefresh = false;
    @observable isAccountTableLoading = false;
    @observable confirmPwdModal = false;
    @observable qrcodeModal = false;

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

    @autobind
    @action('toggle qrcode modal')
    toggleQrcodeModal() {
        this.qrcodeModal = !this.qrcodeModal;
    }
}

export const statusStore = new StatusStore();
