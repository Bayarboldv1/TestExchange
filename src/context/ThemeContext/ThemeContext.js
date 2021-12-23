import React, { useEffect, useReducer } from "react";
import ThemeReducer from './ThemeReducer';

const ThemeContext = React.createContext();
const ThemeConsumer = ThemeContext.Consumer;

// const initialState = sessionStorage.getItem("theme") || sessionStorage.getItem("theme") != undefined ? JSON.parse(sessionStorage.getItem("theme")) : { theme: "light" };
const initialState = { theme: "light" };

const ThemeProvider = ({ children }) => {

    const [data, dispatch] = useReducer(ThemeReducer, initialState);

    useEffect(() => {
        console.log("effect data: ", data)
        sessionStorage.setItem("theme", JSON.stringify(data));
    }, [data])

    const changeTheme = async (data) => {
        dispatch({ type: "SET_THEME", payload: data });
    }

    return (
        <ThemeContext.Provider value={{ data, dispatch, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeProvider, ThemeConsumer, ThemeContext };
