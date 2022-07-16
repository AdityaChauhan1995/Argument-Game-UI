import React from "react";
import { Route } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { history } from '../store';
import LoginScreen from '../pages/login-screen';


const routes = (
    <Router history={history}>
        <div style={{minHeight: 600, height: '100vh'}}>
            <Route exact path="/" component={LoginScreen} />
        </div>
    </Router>
)

export default routes
