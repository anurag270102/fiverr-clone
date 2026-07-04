import { Server } from "socket.io";
import SOCKET_EVENTS from "./socketEvent.js";
import jwt from "jsonwebtoken";
import cookie from "cookie";

let io;
const onlineUsers = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  //socket authentication middleware
  io.use((socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      const token = cookies.accessToken;

      if (!token) {
        return next(new Error("Not authenticated"));
      }

      const payload = jwt.verify(token, process.env.JWT_KEY);

      socket.user = {
        id: payload.id,
        isSeller: payload.isSeller,
      };

      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {

    onlineUsers.set(socket.user.id, socket.id);

    console.log("User connected:", socket.user.id, "Socket ID:", socket.id);
    io.emit(SOCKET_EVENTS.ONLINE_USERS, [...onlineUsers.keys()]);

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("User disconnected:", socket.user.id, "Socket ID:", socket.id);
      onlineUsers.delete(socket.user.id);

      io.emit(SOCKET_EVENTS.ONLINE_USERS, [...onlineUsers.keys()]);
    });
  });
};

export const getUser = (userId) => {
  return onlineUsers.get(userId);
};

export { io };
