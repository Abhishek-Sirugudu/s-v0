import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from "../../../auth/AuthContext";
import { useSocket } from "../../../context/SocketContext";
import InstructorLayoutView from './view';

const InstructorLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const { unreadCounts } = useSocket();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Instructor';

    return (
        <InstructorLayoutView
            userName={userName}
            photoURL={currentUser?.photoURL}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout}
            totalUnread={totalUnread}
            navigate={navigate}
            location={location}
        />
    );
};

export default InstructorLayout;
