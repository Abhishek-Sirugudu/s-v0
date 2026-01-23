import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../auth/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { checkDailyStreak, getRank, getNextLevelProgress } from '../../../utils/gamification';
import StudentDashboardView from './view';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [enrolledCount, setEnrolledCount] = useState(0);
    const [lastCourse, setLastCourse] = useState(null);
    // TODO: [Backend] Fetch gamification stats from /api/student/gamification
    // Expected JSON Shape: 
    // { 
    //   xp: number, 
    //   rank: string, 
    //   streak: number, 
    //   nextLevelXP: number,
    //   level: number
    // }
    const [gamification, setGamification] = useState(null);

    // TODO: [Backend] Fetch recent activity from /api/student/activity
    // Expected JSON Shape: [{ id: string, title: string, type: string, score: number, date: ISOString }]
    const [recentActivity, setRecentActivity] = useState([]);

    // TODO: [Backend] Fetch deadlines from /api/student/deadlines
    // Expected JSON Shape: [{ id: string, title: string, course: string, dueDate: ISOString, isUrgent: boolean }]
    const [deadlines, setDeadlines] = useState([]);

    useEffect(() => {
        // TODO: [Backend] Fetch all dashboard data concurrently
        // const values = await Promise.all([fetchGamification(), fetchActivity(), fetchDeadlines()]);
        // setGamification(values[0]); ...
    }, []);

    const studentName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'Student';

    return (
        <StudentDashboardView
            studentName={studentName}
            enrolledCount={enrolledCount}
            lastCourse={lastCourse}
            gamification={gamification}
            recentActivity={recentActivity}
            deadlines={deadlines}
            navigate={navigate}
        />
    );
};

export default StudentDashboard;
