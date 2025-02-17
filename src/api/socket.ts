import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000/api"; // Địa chỉ server

export const socket: Socket = io(SOCKET_URL, {
  withCredentials: true, 
  autoConnect: false, // Chỉ kết nối khi cần
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};
