import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../../../auth/firebase';
import StudentCoursesView from './view';

const StudentCourses = () => {
    const navigate = useNavigate();
    // TODO: [Backend] Fetch courses from /api/courses
    // Expected JSON Shape: 
    // [{ 
    //   id: string, 
    //   title: string, 
    //   category: string, 
    //   level: 'Beginner'|'Intermediate'|'Advanced', 
    //   instructorName: string, 
    //   thumbnail: string 
    // }]
    const [allCourses, setAllCourses] = useState([]);

    // TODO: [Backend] Fetch user enrollment from /api/user/enrollment
    // Expected JSON Shape: string[] (list of courseIds)
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [loading, setLoading] = useState(true); // Keep true initially to show loading state
    const [activeTab, setActiveTab] = useState('my-learning');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');

    useEffect(() => {
        // TODO: [Backend] Fetch courses logic
        // setAllCourses(...);
        // setEnrolledIds(...);
        setLoading(false); // Remove this when actual fetching is implemented
    }, []);

    const handleEnroll = async (courseId) => {
        if (!auth.currentUser) return;
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                enrolledCourses: arrayUnion(courseId)
            });
            setEnrolledIds(prev => [...prev, courseId]);
            alert("Enrolled successfully!");
        } catch (error) {
            // console.error("Error enrolling:", error);
            alert("Failed to enroll.");
        }
    };

    const getDisplayCourses = () => {
        let filtered = allCourses;

        if (activeTab === 'my-learning') {
            filtered = allCourses.filter(c => enrolledIds.includes(c.id));
        }

        if (searchTerm) {
            filtered = filtered.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(c => c.category === selectedCategory);
        }

        if (selectedLevel !== 'All') {
            filtered = filtered.filter(c => c.level === selectedLevel);
        }

        return filtered;
    };

    const displayCourses = getDisplayCourses();
    const categories = [...new Set(allCourses.map(c => c.category).filter(Boolean))];

    return (
        <StudentCoursesView
            loading={loading}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            displayCourses={displayCourses}
            enrolledIds={enrolledIds}
            categories={categories}
            handleEnroll={handleEnroll}
            navigate={navigate}
        />
    );
};

export default StudentCourses;
