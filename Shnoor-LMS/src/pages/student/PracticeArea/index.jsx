import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentData } from '../../../utils/studentData';
import PracticeAreaView from './view';

const PracticeArea = () => {
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        setTimeout(() => {
            const data = getStudentData();
            setChallenges(data.practiceChallenges || []);
            setLoading(false);
        }, 500);
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
