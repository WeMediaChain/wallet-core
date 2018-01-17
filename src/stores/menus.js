import { observable } from 'mobx';

class MenusStore {
    @observable
    menus = [
        {
            path: '/',
            text: '账户总览',
            icon: 'wallet',
        },
        {
            path: '/account/0x92b748bb6cf3bbe5d0c3409ebbcd22a33fe5eb17',
            text: '账户1',
            icon: 'solution',
        },
        {
            path: '/account/0x71390Ad7724BC0c478C19531E389978F97cBB877',
            text: '账户2',
            icon: 'solution',
        },
        {
            path: '/account/0x243F7F63bc673056D8d2a2c1e31776561Dd7f708',
            text: '账户3',
            icon: 'solution',
        },
    ];
}

export const menuStore = new MenusStore();
