import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentPerformanceView from './view';

const StudentPerformance = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const students = [
        { id: 1, name: "Alice Johnson", course: "React Basics", progress: 85, score: 92, status: "Excellent" },
        { id: 2, name: "Bob Smith", course: "React Basics", progress: 45, score: 78, status: "Good" },
        { id: 3, name: "Charlie Brown", course: "Adv. Node.js", progress: 20, score: 55, status: "At Risk" },
        { id: 4, name: "Diana Prince", course: "UI/UX Design", progress: 95, score: 98, status: "Excellent" },
        { id: 5, name: "Evan Wright", course: "Python Intro", progress: 10, score: 40, status: "At Risk" },
        { id: 6, name: "Fiona Gallagher", course: "React Basics", progress: 60, score: 82, status: "Good" },
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <StudentPerformanceView
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            students={students}
            filteredStudents={filteredStudents}
            navigate={navigate}
        />
    );
};

export default StudentPerformance;
