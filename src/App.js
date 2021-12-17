import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages";
import "antd/dist/antd.css";
import { UserConsumer, UserContext, UserProvider } from "./context/UserContext";
export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Route component={ScrollToTop} />
          <ThemeProvider>
            <UserProvider>
              <Index />
            </UserProvider>
          </ThemeProvider>
        </BrowserRouter>
      </>
    );
  }
}

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};
