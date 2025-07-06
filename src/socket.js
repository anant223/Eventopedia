import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_API_BASE_URL;

const Socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    withCredentials: true
});

// 👇 Add debug logs
Socket.on("connect", () => {
    console.log("✅ Socket connected!", Socket.id);
  });
  
  Socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
  });
  
  Socket.on("disconnect", (reason) => {
    console.warn("⚠️ Socket disconnected:", reason);
  });
  

export {Socket};