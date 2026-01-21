import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentData } from '../../../utils/studentData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import StudentExamsView from './view';

const MOCK_EXAM_DEF = {
    id: 'exam_001',
    title: 'React.js Certification Exam',
    questions: new Array(5).fill(null),
    duration: 45,
    passScore: 60,
    linkedCourseId: ''
};

const StudentExams = () => {
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [passedExams, setPassedExams] = useState([]);
    const [accessStatus, setAccessStatus] = useState({});
    const [courseNames, setCourseNames] = useState({});

    useEffect(() => {
        const initExams = async () => {
            const data = getStudentData();
            const allExams = [MOCK_EXAM_DEF, ...(data.exams || [])];
            const uniqueExams = Array.from(new Map(allExams.map(item => [item.id, item])).values());
            setExams(uniqueExams);

            const passed = JSON.parse(localStorage.getItem('passedExams')) || [];
            setPassedExams(passed);

            const status = {};
            const names = {};

            for (const exam of uniqueExams) {
                if (!exam.linkedCourseId) {
                    status[exam.id] = true;
                    continue;
                }

                try {
                    const docRef = doc(db, "courses", exam.linkedCourseId);
                    const docSnap = await getDoc(docRef);

                    let totalModules = 0;
                    let courseTitle = 'Linked Course';

                    if (docSnap.exists()) {
                        const cData = docSnap.data();
                        totalModules = cData.modules ? cData.modules.length : 0;
                        courseTitle = cData.title;
                    } else {
                        const localCourse = data.courses?.find(c => c.id === exam.linkedCourseId);
                        if (localCourse) {
                            totalModules = localCourse.modules ? localCourse.modules.length : 0;
                            courseTitle = localCourse.title;
                        }
                    }

                    names[exam.linkedCourseId] = courseTitle;

                    const progress = JSON.parse(localStorage.getItem(`progress_${exam.linkedCourseId}`)) || [];
                    const completedCount = progress.length;

                    if (totalModules > 0 && completedCount >= totalModules) {
                        status[exam.id] = true;
                    } else {
                        status[exam.id] = false;
                    }

                } catch (e) {
                    console.error("Error checking exam access for", exam.id, e);
                    status[exam.id] = false;
                }
            }
            setAccessStatus(status);
            setCourseNames(names);
            setLoading(false);
        };

        initExams();
    }, []);

    const isPassed = (examId) => passedExams.includes(examId);

    return (
        <StudentExamsView
            loading={loading}
            exams={exams}
            isPassed={isPassed}
            accessStatus={accessStatus}
            courseNames={courseNames}
            navigate={navigate}
        />
    );
};

export default StudentExams;
