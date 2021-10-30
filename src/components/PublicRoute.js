import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../utility/apiLibrary';

const PublicRoute = ({component: Component, restricted, prop, ...rest}) => {
        
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogged() && restricted ?
                <Redirect to="/" />
            : <Component prop {...props} />
        )} />
    );
};

export default PublicRoute;
