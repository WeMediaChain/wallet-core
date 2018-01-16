import { observable } from 'mobx';

class Menus {
    @observable bars = [
        {
            path: '/',
            text: '账户总览',
            icon: 'wallet',
        },
        {
            path: '/account/0x92b748bb6cf3bbe5d0c3409ebbcd22a33fe5eb17',
            text: '张亚兵',
            icon: 'solution',
        },
        {
            path: '/account/0x71390Ad7724BC0c478C19531E389978F97cBB877',
            text: 'CEO',
            icon: 'solution',
        },
    ];
}

export const menuStore = new Menus();

