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

            // Mock data removed for production.

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
                    // Course not found code
                    // console.error("No such course!");
                }
            } catch (error) {
                // Error loading course
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleEnroll = () => {
        // TODO: [Backend] POST /api/enroll to enroll user in course
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
        if (!enrolledCourses.includes(courseId)) {
            const newEnrolled = [...enrolledCourses, courseId];
            localStorage.setItem('enrolledCourses', JSON.stringify(newEnrolled));
            setIsEnrolled(true);
            // TODO: Toast success
            // alert("Successfully enrolled! Welcome aboard. 🚀");
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
