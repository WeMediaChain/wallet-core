/* eslint-disable */
import { spy } from 'mobx';

const DEFAULT_STYLE = 'color: #006d92; font-weight:bold;',
    ACTION_STYLE = '',
    // Utilities
    repeat = (str, times) => (new Array(times + 1)).join(str),
    pad = (num, maxLength) => repeat('0', maxLength - num.toString().length) + num,
    formatTime = (time) => `${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;

export const startLogging = ({ collapsed, style, titleStyle } = {}) => {
    spy(event => {
        if (event.type === 'action') {
            if (collapsed) {
                console.groupCollapsed && console.groupCollapsed(`%c[${formatTime(new Date())}] Action @ ${event.name}`, titleStyle || ACTION_STYLE);
            } else {
                console.group && console.group(`%c[${formatTime(new Date())}] Action @ ${event.name}`, titleStyle || ACTION_STYLE);
            }
            console.log('%cType: ', style || DEFAULT_STYLE, event.type);
            console.log('%cName: ', style || DEFAULT_STYLE, event.name);
            console.log('%cTarget: ', style || DEFAULT_STYLE, event.target);
            console.log('%cArguments: ', style || DEFAULT_STYLE, event.arguments);
            console.groupEnd && console.groupEnd();
        }
    });
};
