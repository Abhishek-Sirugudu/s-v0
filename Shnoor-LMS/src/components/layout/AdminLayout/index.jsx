import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import AdminLayoutView from './view';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const adminName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Admin';

    return (
        <AdminLayoutView
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout}
            adminName={adminName}
            photoURL={currentUser?.photoURL}
            navigate={navigate}
            location={location}
        />
    );
};

export default AdminLayout;
