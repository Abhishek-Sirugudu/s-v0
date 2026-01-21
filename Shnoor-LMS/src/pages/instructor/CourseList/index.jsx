import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../auth/firebase';
import CourseListView from './view';

const CourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        if (!auth.currentUser) return;
        try {
            setLoading(true);
            const q = query(
                collection(db, "courses"),
                where("instructorId", "==", auth.currentUser.uid)
            );

            const querySnapshot = await getDocs(q);
            const courseList = [];
            querySnapshot.forEach((doc) => {
                courseList.push({ id: doc.id, ...doc.data() });
            });

            if (courseList.length === 0) {
                const mockFallback = [
                    {
                        id: 'mock1',
                        title: 'React Fundamentals (Demo)',
                        category: 'Web Development',
                        status: 'published',
                        modules: new Array(12).fill(null),
                        createdAt: new Date().toISOString()
                    },
                    {
                        id: 'mock2',
                        title: 'Draft Course (Demo)',
                        category: 'Design',
                        status: 'draft',
                        modules: new Array(3).fill(null),
                        createdAt: new Date().toISOString()
                    }
                ];
                setCourses(mockFallback);
            } else {
                setCourses(courseList);
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (e, courseId, status) => {
        e.stopPropagation();
        if (status === 'published') {
            alert("Cannot delete a published course. Please contact admin.");
            return;
        }

        if (window.confirm('Are you sure you want to delete this course? This cannot be undone.')) {
            try {
                if (courseId.startsWith('mock')) {
                    setCourses(courses.filter(c => c.id !== courseId));
                    return;
                }

                await deleteDoc(doc(db, "courses", courseId));
                setCourses(courses.filter(c => c.id !== courseId));
            } catch (error) {
                console.error("Error deleting course:", error);
                alert("Failed to delete course.");
            }
        }
    };

    return (
        <CourseListView
            loading={loading}
            courses={courses}
            navigate={navigate}
            handleDelete={handleDelete}
        />
    );
};

export default CourseList;
