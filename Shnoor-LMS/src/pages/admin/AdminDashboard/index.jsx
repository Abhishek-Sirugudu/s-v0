import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import AdminDashboardView from './view';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // TODO: [Backend] Fetch admin stats from /api/admin/stats
    // Expected JSON Shape:
    // {
    //   activeUsers: number,
    //   completionRate: number,
    //   totalHours: number,
    //   certificates: number
    // }
    const [stats, setStats] = useState(null);

    // TODO: [Backend] Fetch chart data from /api/admin/analytics
    // Expected JSON Shape:
    // [
    //   { name: "Mon", lessons: 12 },
    //   { name: "Tue", lessons: 19 },
    //   ...
    // ]
    const [chartData, setChartData] = useState([]);

    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);

            // TODO: [Backend] Replace with actual API calls
            // const statsRes = await axios.get('/api/admin/stats');
            // setStats(statsRes.data);

            // const chartRes = await axios.get('/api/admin/analytics');
            // setChartData(chartRes.data);

        } catch (error) {
            // Error handling tailored for production (e.g., toast notification)
            // console.error removed for hygiene
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