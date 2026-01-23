import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles) {
        const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
        if (!roles.includes(userRole)) {
            // Redirect based on their role effectively "unauthorized" for the requested route
            if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
            if (userRole === 'instructor') return <Navigate to="/instructor/dashboard" replace />;
            if (userRole === 'student') return <Navigate to="/student/dashboard" replace />;
            return <Navigate to="/" replace />;
        }
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;
