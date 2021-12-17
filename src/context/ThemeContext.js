import React, { useEffect, useReducer } from "react";

const ThemeContext = React.createContext();
const ThemeConsumer = ThemeContext.Consumer;

const initialState = sessionStorage.getItem("theme") || sessionStorage.getItem("theme") != undefined ? JSON.parse(sessionStorage.getItem("theme")) : { theme: "dark" };
const reducer = (d, theme) => {
    sessionStorage.setItem("theme", JSON.stringify({ theme: theme }));
    return {
        theme: theme
    }
}

const ThemeProvider = ({ children }) => {

    const [data, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        console.log("effect data: ", data)
        sessionStorage.setItem("theme", JSON.stringify(data));
    }, [data])

    return (
        <ThemeContext.Provider value={{ data, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeProvider, ThemeConsumer, ThemeContext };
