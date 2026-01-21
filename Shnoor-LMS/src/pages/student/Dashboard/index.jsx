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
    const [gamification, setGamification] = useState({
        xp: 0,
        rank: 'Novice',
        streak: 0,
        progress: 0,
        nextLevelXP: 100
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            const enrolled = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
            setEnrolledCount(enrolled.length);

            if (enrolled.length > 0) {
                setLastCourse({
                    id: enrolled[enrolled.length - 1],
                    title: 'Resume your learning',
                    progress: 45
                });
            }

            if (auth.currentUser) {
                const userRef = doc(db, "users", auth.currentUser.uid);

                try {
                    const currentStreak = await checkDailyStreak(auth.currentUser.uid);

                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const currentXP = data.xp || 0;
                        const rankObj = getRank(currentXP);
                        const levelProgress = getNextLevelProgress(currentXP);

                        setGamification({
                            xp: currentXP,
                            rank: rankObj.name,
                            streak: currentStreak,
                            progress: levelProgress.progress,
                            nextLevelXP: levelProgress.nextLevelXP
                        });
                    }
                } catch (err) {
                    console.error("Error fetching gamification data:", err);
                }
            }
        };

        fetchDashboardData();
    }, []);

    const studentName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'Student';

    return (
        <StudentDashboardView
            studentName={studentName}
            enrolledCount={enrolledCount}
            lastCourse={lastCourse}
            gamification={gamification}
            navigate={navigate}
        />
    );
};

export default StudentDashboard;
