import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { auth, db } from '../../../auth/firebase';
import InstructorDashboardView from './view';

const InstructorDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        myCourses: 0,
        totalStudents: 0,
        avgRating: 0
    });
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('Instructor');

    useEffect(() => {
        const fetchStats = async () => {
            if (!auth.currentUser) return;
            setUserName(auth.currentUser.displayName || auth.currentUser.email.split('@')[0]);

            // TODO: [Backend] Fetch instructor dashboard stats from /api/instructor/stats
            // Expected JSON Shape:
            // {
            //   myCourses: number,
            //   totalStudents: number,
            //   avgRating: number
            // }
            // const stats = await fetch(...)
            // setStats(stats);

            setLoading(false);
        };

        fetchStats();
    }, []);

    return (
        <InstructorDashboardView
            loading={loading}
            userName={userName}
            stats={stats}
            navigate={navigate}
        />
    );
};

export default InstructorDashboard;
