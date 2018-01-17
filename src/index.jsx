import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './pages/Home';
import { stores } from './stores';
import { startLogging } from './utils/mobxLogger';

render(
    <HashRouter>
        <Provider {...stores}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById('app'),
);

/* eslint-disable no-unused-expressions */
process.env.NODE_ENV === 'development' && startLogging();
