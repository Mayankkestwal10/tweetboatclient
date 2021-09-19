import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated, isTokenExpired } from './auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
        {...rest}
        render={
            props=>isAuthenticated() && !isTokenExpired(isAuthenticated().token) ? (
                <Component />
            ):(
                <Redirect 
                to={{
                    pathname: "/",
                    state: {from: props.location}
                }}/>
            )
        } />
    )
}

export default PrivateRoute;