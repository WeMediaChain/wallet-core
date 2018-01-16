/**
 * Created by Min on 2017/7/11.
 */
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

export const routes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "home" */ '../pages/Home'),
            loading: Loading,
        }),
        exact: true,
        strict: true,
        key: 1,
    },
    {
        path: '/todo',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "example" */ '../pages/Todo'),
            loading: Loading,
        }),
        exact: true,
        strict: true,
        key: 2,
    },
    {
        path: '/plain',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "second" */ '../pages/Plain'),
            loading: Loading,
        }),
        exact: true,
        strict: true,
        key: 3,
    },
];
