import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './pages/Home';
import { stores } from './stores';

render(
    <Router>
        <Provider {...stores}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('app'),
);
