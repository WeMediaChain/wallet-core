import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './pages/Home';

render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app'),
);
