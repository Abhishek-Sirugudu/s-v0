import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentData, saveStudentData } from '../../../utils/studentData';
import { awardXP } from '../../../utils/gamification';
import { auth } from '../../../auth/firebase';
import ExamRunnerView from './view';

const MOCK_EXAM_DATA = {
    id: 'exam_demo_001',
    title: 'React.js Certification Exam',
    duration: 45,
    passScore: 60,
    questions: [
        { id: 1, type: 'mcq', text: 'Which hook is used to perform side effects in functional components?', options: ['useState', 'useEffect', 'useReducer', 'useContext'], correctAnswer: 'useEffect', marks: 10 },
        { id: 2, type: 'mcq', text: 'What is the Virtual DOM?', options: ['A direct copy of the real DOM', 'A lightweight JavaScript representation of the DOM', 'A browser extension', 'None of the above'], correctAnswer: 'A lightweight JavaScript representation of the DOM', marks: 10 },
        { id: 3, type: 'mcq', text: 'How do you pass data to a child component?', options: ['State', 'Props', 'Redux', 'Context'], correctAnswer: 'Props', marks: 10 },
        { id: 4, type: 'mcq', text: 'Which method is used to update state in a class component?', options: ['updateState()', 'changeState()', 'setState()', 'forceUpdate()'], correctAnswer: 'setState()', marks: 10 },
        { id: 5, type: 'mcq', text: 'What is the default port for a React app created with CRA?', options: ['8080', '5000', '3000', '4200'], correctAnswer: '3000', marks: 10 }
    ]
};

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
        setTimeout(() => {
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
            } else if (!foundExam && (examId === 'exam_001' || examId.includes('demo'))) {
                foundExam = MOCK_EXAM_DATA;
            }

            if (foundExam) {
                setExam(foundExam);
                if (foundExam.duration > 0) {
                    setTimeLeft(foundExam.duration * 60);
                }
            }
            setLoading(false);
        }, 500);
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
                console.error("Exam data missing questions");
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
                console.error("Error saving progress:", postSubmitError);
            }

        } catch (error) {
            console.error("Error in handleSubmit:", error);
            alert("An error occurred while submitting. Please try again or check console.");
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
