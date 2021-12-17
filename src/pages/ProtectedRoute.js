import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { user } = useContext(UserContext);

    return (
        <Route
            render={props =>
                user.auth ? <Component {...props} /> : <Redirect to="/login" />
            }
            {...rest}
        />
    )
}

export default ProtectedRoute;
