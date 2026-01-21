import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    // Mock socket object with no-op functions to prevent errors
    const mockSocket = {
        on: (event, callback) => { console.log(`[MockSocket] Listening for: ${event}`); },
        emit: (event, data) => { console.log(`[MockSocket] Emitting: ${event}`, data); },
        off: (event) => { console.log(`[MockSocket] Removing listener for: ${event}`); },
        connect: () => { console.log('[MockSocket] Connected'); },
        disconnect: () => { console.log('[MockSocket] Disconnected'); },
        close: () => { console.log('[MockSocket] Closed'); },
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
