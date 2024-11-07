import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";
import Index from "./pages";
import "antd/dist/antd.css";
import { UserProvider } from "./context/UserContext";
import socketIOClient from 'socket.io-client';
import { SocketProvider } from "./context/SocketContext";
import parser from 'socket.io-msgpack-parser';
import { BalanceProvider } from "./context/BalanceContext/BalanceContext";


// const socket = socketIOClient("http://192.168.1.107:5000", { path: "/gam_socket/", parser , secure: true });
// const socket = socketIOClient("https://ws.coinmart.mn", { path: "/gam_socket/", parser , secure: true });

//boldko_1
//
///// Boldko______________________________2



export default class App extends Component {

  render() {
    return (
      <>
        <BrowserRouter>
          <Route component={ScrollToTop} />
          <ThemeProvider>
            <UserProvider>
              <BalanceProvider>
                <Index />
              </BalanceProvider>
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
