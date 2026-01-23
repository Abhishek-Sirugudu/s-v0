import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PracticeAreaView from './view';

const PracticeArea = () => {
    const navigate = useNavigate();
    // TODO: [Backend] Fetch practice challenges from /api/practice/challenges
    // Expected JSON Shape: 
    // [{ 
    //   id: string, 
    //   title: string, 
    //   text: string, 
    //   difficulty: 'Easy' | 'Medium' | 'Hard', 
    //   type: 'coding' | 'quiz', 
    //   status: 'Solved' | 'Unsolved' 
    // }]
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        // TODO: [Backend] Fetch challenges logic
        // setChallenges(...);
        setLoading(false);
    }, []);

    const filteredChallenges = filter === 'All'
        ? challenges
        : challenges.filter(c => c.difficulty === filter);

    return (
        <PracticeAreaView
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            challenges={challenges}
            filteredChallenges={filteredChallenges}
            navigate={navigate}
        />
    );
};

export default PracticeArea;
