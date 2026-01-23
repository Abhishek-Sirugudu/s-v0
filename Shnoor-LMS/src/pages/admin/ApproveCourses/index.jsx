import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../../auth/firebase';
import ApproveCoursesView from './view';

const ApproveCourses = () => {
    const [pendingCourses, setPendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        fetchPendingCourses();
    }, []);

    const fetchPendingCourses = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "courses"),
                where("status", "==", "pending")
            );

            const querySnapshot = await getDocs(q);
            const courses = [];
            querySnapshot.forEach((doc) => {
                courses.push({ id: doc.id, ...doc.data() });
            });

            setPendingCourses(courses);
            setLoading(false);
        } catch (error) {
            // console.error("Error fetching pending courses:", error);
            setLoading(false);
        }
    };

    const handleAction = async (courseId, status) => {
        try {
            await updateDoc(doc(db, "courses", courseId), {
                status: status,
                verifiedAt: new Date().toISOString()
            });

            setPendingCourses(prev => prev.filter(c => c.id !== courseId));
            setSelectedCourse(null);
        } catch (error) {
            // Error handling
        }
    };

    return (
        <ApproveCoursesView
            loading={loading}
            pendingCourses={pendingCourses}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            handleAction={handleAction}
        />
    );
};

export default ApproveCourses;
