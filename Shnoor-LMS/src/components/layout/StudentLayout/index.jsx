import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import { useSocket } from '../../../context/SocketContext';
import { db } from '../../../auth/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getRank } from "../../../utils/gamification";
import StudentLayoutView from './view';

const StudentLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [xp, setXp] = useState(0);
    const [rank, setRank] = useState('Novice');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { unreadCounts } = useSocket();
    const totalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setXp(data.xp || 0);
                        const rankObj = getRank(data.xp || 0);
                        setRank(rankObj.name);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [currentUser]);

    const studentName = currentUser?.displayName || "Student";

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <StudentLayoutView
            studentName={studentName}
            xp={xp}
            rank={rank}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            handleLogout={handleLogout}
            totalUnread={totalUnread}
            navigate={navigate}
            location={location}
        />
    );
};

export default StudentLayout;
