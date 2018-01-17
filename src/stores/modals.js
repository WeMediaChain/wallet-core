import { observable, action } from 'mobx';

class ModalStore {
    @observable transferModal = false;

    @action('toggle transfer modal')
    toggleTransfer() {
        this.transferModal = !this.transferModal;
    }
}

export const modalStore = new ModalStore();
