/**
 * Created by Min on 2017/7/11.
 */
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

export const routes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import(
                /* webpackChunkName: "AccountPreview" */
                '../pages/AccountPreview'),
            loading: Loading,
        }),
        exact: true,
        strict: true,
        key: 1,
    },
    {
        path: '/account/:address',
        component: Loadable({
            loader: () => import(
                /* webpackChunkName: "Account" */
                '../pages/Account'),
            loading: Loading,
        }),
        exact: true,
        strict: true,
        key: 2,
    },
];
