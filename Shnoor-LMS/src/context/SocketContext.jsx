import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    const mockSocket = {
        on: (event, callback) => { },
        emit: (event, data) => { },
        off: (event) => { },
        connect: () => { },
        disconnect: () => { },
        close: () => { },
    };

    const [socket] = useState(mockSocket);
    const [unreadCounts, setUnreadCounts] = useState({});

    const markChatRead = (chatId) => {
        setUnreadCounts(prev => {
            const newCounts = { ...prev };
            delete newCounts[chatId];
            return newCounts;
        });
    };

    const value = {
        socket,
        unreadCounts,
        setUnreadCounts,
        markChatRead
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
