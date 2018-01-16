import React from 'react';
import {
    Switch,
    Route,
    BrowserRouter as Router,
} from 'react-router-dom';
import { routes } from './router';

export default () => (
    <Router>
        <Switch>
            {routes.map(route => <Route {...route} />)}
        </Switch>
    </Router>
);
