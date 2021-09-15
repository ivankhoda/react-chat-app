import React from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT);
const SocketContext = React.createContext(socket);
export { socket, SocketContext };
