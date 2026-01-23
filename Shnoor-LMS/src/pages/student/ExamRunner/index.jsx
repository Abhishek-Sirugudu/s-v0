import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentData, saveStudentData } from '../../../utils/studentData';
import { awardXP } from '../../../utils/gamification';
import { auth } from '../../../auth/firebase';
import ExamRunnerView from './view';

// MOCK_EXAM_DATA removed for production. 
// Ensure backend provides exam data via API.

const ExamRunner = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            // TODO: [Backend] Fetch student data from /api/student/profile
            const data = getStudentData();
            let foundExam = (data.exams || []).find(e => e.id === examId);

            if (examId && examId.startsWith('prac_')) {
                const challenge = (data.practiceChallenges || []).find(c => c.id === examId);
                if (challenge) {
                    foundExam = {
                        id: challenge.id,
                        title: challenge.title,
                        duration: 0,
                        passScore: 0,
                        questions: [challenge]
                    };
                }
            }

            if (foundExam) {
                setExam(foundExam);
                if (foundExam.duration > 0) {
                    setTimeLeft(foundExam.duration * 60);
                }
            }
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [examId]);

    useEffect(() => {
        if (!exam || isSubmitted || timeLeft <= 0 || exam.duration === 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, isSubmitted, exam]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleAnswer = (val) => {
        setAnswers(prev => ({ ...prev, [currentQIndex]: val }));
    };

    const handleSubmit = async () => {
        try {
            let gainedPoints = 0;
            let totalPoints = 0;

            if (!exam || !exam.questions) {
                // Data missing questions
                return;
                return;
            }

            exam.questions.forEach((q, index) => {
                totalPoints += (q.marks || 0);
                if (q.type === 'mcq' && answers[index] === q.correctAnswer) {
                    gainedPoints += (q.marks || 0);
                } else if (q.type === 'coding') {
                    const userCode = answers[index];
                    if (userCode && userCode.length > 20) {
                        gainedPoints += (q.marks || 0);
                    }
                } else if (q.type === 'descriptive') {
                    const userDescription = answers[index];
                    if (userDescription && userDescription.trim().length > 20) {
                        gainedPoints += (q.marks || 0);
                    }
                }
            });

            const percentage = totalPoints === 0 ? 100 : Math.round((gainedPoints / totalPoints) * 100);
            const passScore = exam.passScore || 0;
            const passed = percentage >= passScore;

            setResult({ percentage, passed });
            setIsSubmitted(true);


            try {
                if (passed) {
                    const data = getStudentData();
                    const existingCert = data.certificates?.find(c => c.courseName === exam.title);

                    if (!existingCert) {
                        const newCert = {
                            id: `cert_${Date.now()}`,
                            courseName: exam.title,
                            issueDate: new Date().toLocaleDateString(),
                            score: percentage,
                            instructor: 'Instructor Name'
                        };
                        saveStudentData({ ...data, certificates: [...(data.certificates || []), newCert] });
                    }

                    const passedExams = JSON.parse(localStorage.getItem('passedExams')) || [];
                    if (!passedExams.includes(exam.id)) {
                        passedExams.push(exam.id);
                        localStorage.setItem('passedExams', JSON.stringify(passedExams));
                    }

                    if (auth && auth.currentUser) {
                        await awardXP(auth.currentUser.uid, 50, 'Passed Exam');
                    }
                }
            } catch (postSubmitError) {
                // Post-submit error
            }

        } catch (error) {
            // Error handling
        }
    };

    return (
        <ExamRunnerView
            loading={loading}
            exam={exam}
            currentQIndex={currentQIndex}
            setCurrentQIndex={setCurrentQIndex}
            answers={answers}
            handleAnswer={handleAnswer}
            timeLeft={timeLeft}
            isSubmitted={isSubmitted}
            result={result}
            handleSubmit={handleSubmit}
            formatTime={formatTime}
            navigate={navigate}
        />
    );
};

export default ExamRunner;
