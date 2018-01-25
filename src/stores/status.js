import { observable, action } from 'mobx';

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
    
    @action.bound
    toggleQrcodeModal() {
        this.qrcodeModal = !this.qrcodeModal;
    }
    
    @action.bound
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
