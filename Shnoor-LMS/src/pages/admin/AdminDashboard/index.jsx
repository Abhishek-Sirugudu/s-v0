import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import AdminDashboardView from './view';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    const [stats, setStats] = useState({
        activeUsers: 0,
        completionRate: 0,
        totalHours: 0,
        certificates: 0
    });

    const [chartData, setChartData] = useState([]);

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            
            
            const usersSnap = await getDocs(collection(db, "users"));
            const coursesSnap = await getDocs(query(collection(db, "courses"), where("status", "==", "published")));

            
            setStats({
                activeUsers: Math.floor(usersSnap.size * 0.6) || 0,
                completionRate: 42,
                totalHours: usersSnap.size * 15 || 0,
                certificates: Math.floor(usersSnap.size * 0.1) || 0
            });

            
            setChartData([
                { name: 'Mon', lessons: 120 },
                { name: 'Tue', lessons: 145 },
                { name: 'Wed', lessons: 190 },
                { name: 'Thu', lessons: 165 },
                { name: 'Fri', lessons: 210 },
                { name: 'Sat', lessons: 85 },
                { name: 'Sun', lessons: 95 },
            ]);

        } catch (error) {
            console.error("Error fetching admin stats:", error);
        } finally {
            setLoading(false);
        }
    }, []); 

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]); 

    return (
        <AdminDashboardView 
            stats={stats}
            chartData={chartData}
            loading={loading}
            navigate={navigate}
        />
    );
};

export default AdminDashboard;