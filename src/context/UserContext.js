import React, { createContext, useEffect, useReducer } from 'react';

const UserContext = createContext();
const UserConsumer = UserContext.Consumer;

const initialState = sessionStorage.getItem("user") || sessionStorage.getItem("user") === undefined ? JSON.parse(sessionStorage.getItem("user")) : { user: null, auth: false, token: null };
const reducer = (action, user) => {
    sessionStorage.setItem("user", JSON.stringify({ user: user.user, auth: user.auth, token: user.token }));
    return {
        user: user.user,
        auth: user.auth,
        token: user.token
    }
}

const UserProvider = ({ children }) => {

    const [user, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(user));
    }, [user])

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );

}

export { UserContext, UserProvider, UserConsumer };