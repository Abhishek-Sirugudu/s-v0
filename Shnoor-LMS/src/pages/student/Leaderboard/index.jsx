import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import { getRank } from '../../../utils/gamification';
import LeaderboardView from './view';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            let fetchedUsers = [];
            try {
                const usersRef = collection(db, "users");
                const q = query(
                    usersRef,
                    where("role", "==", "student"),
                    orderBy("xp", "desc"),
                    limit(10)
                );

                const snapshot = await getDocs(q);
                fetchedUsers = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

            } catch (error) {
                console.warn("Leaderboard fetch failed (likely missing index), using mock data:", error);
            } finally {
                if (fetchedUsers.length < 5) {
                    const bots = [
                        { id: 'bot1', displayName: 'Alice Bot', xp: 1250, role: 'student' },
                        { id: 'bot2', displayName: 'Bob Bot', xp: 980, role: 'student' },
                        { id: 'bot3', displayName: 'Charlie Bot', xp: 850, role: 'student' },
                        { id: 'bot4', displayName: 'Diana Bot', xp: 720, role: 'student' },
                        { id: 'bot5', displayName: 'Evan Bot', xp: 500, role: 'student' },
                        { id: 'bot6', displayName: 'Frank Bot', xp: 450, role: 'student' },
                        { id: 'bot7', displayName: 'Grace Bot', xp: 300, role: 'student' },
                    ];
                    fetchedUsers = [...fetchedUsers, ...bots].sort((a, b) => b.xp - a.xp).slice(0, 10);
                }

                setLeaders(fetchedUsers);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const topThree = leaders.slice(0, 3);
    const rest = leaders.slice(3);

    return (
        <LeaderboardView
            loading={loading}
            topThree={topThree}
            rest={rest}
            getRank={getRank}
        />
    );
};

export default Leaderboard;
