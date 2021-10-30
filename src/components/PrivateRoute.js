import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../utility/apiLibrary';

const PrivateRoute = ({component: Component, prop, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogged() ?
                <Component prop {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;