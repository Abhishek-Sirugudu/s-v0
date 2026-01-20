import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClipboardList, FaCheckCircle, FaPlay, FaClock, FaRedo, FaLock, FaExternalLinkAlt } from 'react-icons/fa';
import { getStudentData } from '../../utils/studentData';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../auth/firebase';
import '../../styles/Dashboard.css';
import '../../styles/Student.css';

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

    if (loading) return <div className="p-8">Loading exams...</div>;

    return (
        <div>
            <div className="student-page-header">
                <div>
                    <h3>My Exams</h3>
                    <p className="text-gray-500">Take assessments to prove your skills.</p>
                </div>
            </div>

            {exams.length === 0 ? (
                <div className="empty-state-card">
                    <FaClipboardList className="empty-state-icon" />
                    <h3>No Exams Available</h3>
                    <p className="empty-state-text">You don't have any assigned exams yet.</p>
                </div>
            ) : (
                <div className="student-course-grid">
                    {exams.map((exam, index) => {
                        const passed = isPassed(exam.id);
                        const unlocked = accessStatus[exam.id] !== false;
                        const neededCourseName = courseNames[exam.linkedCourseId] || 'Prerequisite Course';

                        return (
                            <div key={exam.id} className="student-course-card" style={{ cursor: 'default', opacity: unlocked ? 1 : 0.8 }}>
                                <div className={`course-thumbnail course-thumbnail-gradient-${index % 4}`} style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {passed ? (
                                        <FaCheckCircle style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.9)' }} />
                                    ) : !unlocked ? (
                                        <FaLock style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.5)' }} />
                                    ) : (
                                        <FaClipboardList style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.3)' }} />
                                    )}
                                </div>

                                <div className="course-details" style={{ padding: '20px' }}>
                                    <h4 className="course-title" style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{exam.title}</h4>

                                    <div className="course-meta" style={{ marginBottom: '15px' }}>
                                        <span>{exam.questions.length} Questions</span>
                                        <span><FaClock /> {exam.duration} mins</span>
                                    </div>

                                    {passed ? (
                                        <div style={{ marginTop: 'auto' }}>
                                            <div className="status-badge success w-100 flex-center" style={{ marginBottom: '10px', justifyContent: 'center' }}>
                                                <FaCheckCircle /> Passed
                                            </div>
                                            <button
                                                className="btn-secondary w-100"
                                                onClick={() => navigate('/student/certificates')}
                                            >
                                                View Certificate
                                            </button>
                                        </div>
                                    ) : !unlocked ? (
                                        <div style={{ marginTop: 'auto' }}>
                                            <div className="text-secondary text-sm mb-sm flex-center" style={{ gap: '5px', color: '#dc2626' }}>
                                                <FaLock /> Locked
                                            </div>
                                            <div className="text-xs text-gray-500 mb-md">
                                                Complete <strong>{neededCourseName}</strong> to unlock this exam.
                                            </div>
                                            <button
                                                className="btn-secondary w-100"
                                                onClick={() => navigate(`/student/course/${exam.linkedCourseId}`)}
                                            >
                                                <FaExternalLinkAlt /> Go to Course
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ marginTop: 'auto' }}>
                                            <div className="flex-between-center text-sm text-gray-500 mb-sm">
                                                <span>Pass Score: {exam.passScore}%</span>
                                            </div>
                                            <button
                                                className="btn-primary w-100"
                                                onClick={() => navigate(`/student/exam/${exam.id}`)}
                                            >
                                                <FaPlay size={10} style={{ marginRight: '5px' }} /> Start Exam
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentExams;
