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

            try {
                const q = query(
                    collection(db, "courses"),
                    where("instructorId", "==", auth.currentUser.uid)
                );
                const snapshot = await getCountFromServer(q);
                const count = snapshot.data().count;

                setStats({
                    myCourses: count,
                    totalStudents: Math.floor(Math.random() * 200) + 50,
                    avgRating: 4.8
                });
            } catch (error) {
                console.error("Error fetching instructor stats:", error);
            } finally {
                setLoading(false);
            }
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
