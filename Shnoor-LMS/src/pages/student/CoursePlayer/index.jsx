import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../auth/firebase';
import { awardXP } from '../../../utils/gamification';
import CoursePlayerView from './view';

const CoursePlayer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [currentModule, setCurrentModule] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedModuleIds, setCompletedModuleIds] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            // Mock data removed for production.

            try {
                const docRef = doc(db, "courses", courseId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const courseData = docSnap.data();
                    const fullCourse = { id: docSnap.id, ...courseData };
                    setCourse(fullCourse);
                    if (courseData.modules && courseData.modules.length > 0) {
                        setCurrentModule(courseData.modules[0]);
                    }
                } else {
                    // console.error("No such course!");
                }
            } catch (error) {
                // console.error("Error loading course:", error);
            } finally {
                setLoading(false);
            }
        };

        const storedProgress = JSON.parse(localStorage.getItem(`progress_${courseId}`)) || [];
        setCompletedModuleIds(storedProgress);

        fetchCourse();
    }, [courseId]);

    const handleMarkComplete = () => {
        if (!currentModule) return;

        if (!completedModuleIds.includes(currentModule.id)) {
            const newCompleted = [...completedModuleIds, currentModule.id];
            setCompletedModuleIds(newCompleted);
            localStorage.setItem(`progress_${courseId}`, JSON.stringify(newCompleted));

            if (auth.currentUser) {
                awardXP(auth.currentUser.uid, 10, 'Completed Lesson');
            }



        }
    };

    const isModuleCompleted = (id) => completedModuleIds.includes(id);

    const getProgress = () => {
        if (!course || !course.modules || course.modules.length === 0) return 0;
        return Math.round((completedModuleIds.length / course.modules.length) * 100);
    };

    const progressPercentage = getProgress();

    return (
        <CoursePlayerView
            course={course}
            currentModule={currentModule}
            setCurrentModule={setCurrentModule}
            loading={loading}
            progressPercentage={progressPercentage}
            isModuleCompleted={isModuleCompleted}
            handleMarkComplete={handleMarkComplete}
            navigate={navigate}
            courseId={courseId}
        />
    );
};

export default CoursePlayer;
