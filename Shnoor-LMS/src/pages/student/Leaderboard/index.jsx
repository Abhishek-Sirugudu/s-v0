import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import { getRank } from '../../../utils/gamification';
import LeaderboardView from './view';

const Leaderboard = () => {
    // TODO: [Backend] Fetch leaderboard data from /api/leaderboard
    // Expected JSON Shape: 
    // [{ 
    //   id: string, 
    //   displayName: string, 
    //   xp: number, 
    //   role: 'student', 
    //   rank: number 
    // }]
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: [Backend] Fetch leaderboard logic
        // setLeaders(...);
        setLoading(false);
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
