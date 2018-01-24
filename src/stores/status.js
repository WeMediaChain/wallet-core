import { observable, action } from 'mobx';
import autobind from 'autobind-decorator';

class StatusStore {
    @observable transferModal = false;
    @observable isRefresh = false;
    @observable isAccountTableLoading = false;
    @observable confirmPwdModal = false;
    @observable qrcodeModal = false;
    @observable toastModal = false;
    @observable toastMessage = '';

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

    @autobind
    @action('show toast message')
    showToast(message, duration = 1500) {
        this.toastMessage = message;
        this.toastModal = true;

        // auto hide toast message
        setTimeout(() => {
            this.toastModal = false;
        }, duration);
    }
}

export const statusStore = new StatusStore();
