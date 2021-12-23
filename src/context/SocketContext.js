import React from "react";

const SocketContext = React.createContext();
const SocketConsumer = SocketContext.Consumer;
const SocketProvider = SocketContext.Provider;

export { SocketProvider, SocketConsumer, SocketContext };
