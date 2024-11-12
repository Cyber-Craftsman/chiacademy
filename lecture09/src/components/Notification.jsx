import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [newPost, setNewPost] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    socket.on('newPost', (data) => {
      setNewPost(true);
      toast.info(`A new post has been created by ${data.user}: ${data.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <NotificationContext.Provider value={{ newPost, setNewPost }}>{children}</NotificationContext.Provider>;
};
