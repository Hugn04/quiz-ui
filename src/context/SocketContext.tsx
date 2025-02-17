import { createContext, useEffect, useState, ReactNode } from "react";
import { socket, connectSocket, disconnectSocket } from "../api/socket";

interface SocketContextType {
  socket: typeof socket;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    connectSocket();

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
