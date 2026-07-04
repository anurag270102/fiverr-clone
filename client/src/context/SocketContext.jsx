import { createContext, useEffect, useState } from "react";
import socket from "../utils/socket";
import getCurrentUser from "../utils/getCurrentUser";
import { SOCKET_EVENTS } from "../utils/constant";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const currentUser = getCurrentUser();
  const currentUserId = currentUser?._id;

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const disconnectUser = () => {
    socket.disconnect();
    setOnlineUsers([]);
  };

  useEffect(() => {
    if (!currentUserId) return;

    socket.connect();

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on(SOCKET_EVENTS.ONLINE_USERS, handleOnlineUsers);

    return () => {
      socket.off(SOCKET_EVENTS.ONLINE_USERS, handleOnlineUsers);
      socket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    const handleNotification = ({ unreadCount }) => {
      setNotificationCount(unreadCount);
    };

    socket.on(SOCKET_EVENTS.NEW_NOTIFICATION_COUNT, handleNotification);

    return () => {
      socket.off(SOCKET_EVENTS.NEW_NOTIFICATION_COUNT, handleNotification);
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{
        socket,
        disconnectUser,
        onlineUsers,
        notificationCount,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
