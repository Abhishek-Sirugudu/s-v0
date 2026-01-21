import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import CourseDetailView from './view';

const CourseDetail = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
            setIsEnrolled(enrolledCourses.includes(courseId));

            if (courseId.startsWith('mock')) {
                setTimeout(() => {
                    const mockData = {
                        id: courseId,
                        title: courseId === 'mock1' ? 'React Fundamentals' : 'Course Title',
                        description: 'This comprehensive course will take you from a beginner to an advanced practitioner. You will learn key concepts, best practices, and build real-world projects.',
                        category: 'Web Development',
                        level: 'Beginner',
                        rating: 4.8,
                        instructor: {
                            name: 'Sarah Johnson',
                            bio: 'Senior Software Engineer with 10+ years of experience in full-stack development. Passionate about teaching and mentorship.',
                            avatar: null
                        },
                        modules: [
                            { id: 'm1', title: 'Welcome to the Course', duration: '5m', type: 'video' },
                            { id: 'm2', title: 'Chapter 1: Introduction', duration: '15m', type: 'video' },
                            { id: 'm3', title: 'Chapter 1: Quiz', duration: '10m', type: 'quiz' },
                            { id: 'm4', title: 'Chapter 2: Key Concepts', duration: '20m', type: 'video' },
                            { id: 'm5', title: 'Final Project Brief', duration: '5m', type: 'pdf' }
                        ],
                        updatedAt: '2025-12-15'
                    };
                    setCourse(mockData);
                    setLoading(false);
                }, 500);
                return;
            }

            try {
                const docRef = doc(db, "courses", courseId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCourse({
                        id: docSnap.id,
                        ...data,
                        instructor: {
                            name: data.instructorName || 'Instructor',
                            bio: 'Experienced industry professional.',
                            avatar: null
                        }
                    });
                } else {
                    console.error("No such course!");
                }
            } catch (error) {
                console.error("Error loading course:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleEnroll = () => {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
        if (!enrolledCourses.includes(courseId)) {
            const newEnrolled = [...enrolledCourses, courseId];
            localStorage.setItem('enrolledCourses', JSON.stringify(newEnrolled));
            setIsEnrolled(true);
            alert("Successfully enrolled! Welcome aboard. 🚀");
        }
    };

    const handleContinue = () => {
        navigate(`/student/course/${courseId}/learn`);
    };

    return (
        <CourseDetailView
            course={course}
            loading={loading}
            isEnrolled={isEnrolled}
            handleEnroll={handleEnroll}
            handleContinue={handleContinue}
            navigate={navigate}
        />
    );
};

export default CourseDetail;
