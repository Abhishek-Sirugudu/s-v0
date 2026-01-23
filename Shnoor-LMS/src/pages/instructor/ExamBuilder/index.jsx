
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../auth/firebase';
import ExamBuilderView from './view';

const ExamBuilder = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [instructorCourses, setInstructorCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!auth.currentUser) return;
            try {
                const q = query(
                    collection(db, "courses"),
                    where("instructorId", "==", auth.currentUser.uid)
                );
                const snapshot = await getDocs(q);
                const courses = snapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    validityPeriod: doc.data().validityPeriod,
                    validityUnit: doc.data().validityUnit
                }));
                setInstructorCourses(courses);
            } catch (err) {
                // console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Exam',
        duration: 60,
        passPercentage: 70,
        linkedCourseId: '',
        validityPeriod: '',
        validityUnit: 'Weeks',
        questions: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updates = { ...prev, [name]: value };

            if (name === 'linkedCourseId') {
                const selectedCourse = instructorCourses.find(c => c.id === value);
                if (selectedCourse) {
                    updates.validityPeriod = selectedCourse.validityPeriod || '';
                    updates.validityUnit = selectedCourse.validityUnit || 'Weeks';
                } else {
                    updates.validityPeriod = '';
                    updates.validityUnit = 'Weeks';
                }
            }
            return updates;
        });
    };

    const addQuestion = (type) => {
        const newQ = type === 'mcq'
            ? { id: Date.now(), type: 'mcq', text: '', options: ['', '', '', ''], correctAnswer: '', marks: 5 }
            : type === 'descriptive'
                ? { id: Date.now(), type: 'descriptive', text: '', modelAnswer: '', marks: 10 }
                : { id: Date.now(), type: 'coding', title: '', text: '', constraints: '', starterCode: '// Write your code here', testCases: [], marks: 20 };

        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, newQ]
        }));
    };

    const updateQuestion = (qId, field, value) => {
        setFormData(prev => {
            const updatedQuestions = prev.questions.map(q => {
                if (q.id === qId) {
                    return { ...q, [field]: value };
                }
                return q;
            });
            return { ...prev, questions: updatedQuestions };
        });
    };

    const removeQuestion = (qId) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== qId)
        }));
    };

    const validateForm = () => {
        if (!formData.title) return "Exam title is required.";

        for (let i = 0; i < formData.questions.length; i++) {
            const q = formData.questions[i];
            if (!q.text) return `Question ${i + 1} is missing text.`;
            if (q.type === 'mcq') {
                if (q.options.some(o => !o)) return `Question ${i + 1} has empty options.`;
                if (!q.correctAnswer) return `Question ${i + 1} needs a correct answer selected.`;
            }
            if (q.type === 'descriptive') {
                if (!q.text) return `Question ${i + 1} is missing text.`;
            }
        }
        return null;
    };

    const handleSave = async () => {
        const error = validateForm();
        if (error) {
            return;
        }

        setLoading(true);

        try {
            // TODO: [Backend] Create/Update exam via POST /api/instructor/exams
            // Payload: { ...formData, linkedCourseId, ... }
            /*
            const response = await fetch('/api/instructor/exams', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            */

            navigate('/instructor/dashboard');

        } catch (err) {
            // Error handling
        } finally {
            setLoading(false);
        }
    };

    return (
        <ExamBuilderView
            step={step}
            setStep={setStep}
            loading={loading}
            instructorCourses={instructorCourses}
            formData={formData}
            handleInputChange={handleInputChange}
            addQuestion={addQuestion}
            updateQuestion={updateQuestion}
            removeQuestion={removeQuestion}
            handleSave={handleSave}
            navigate={navigate}
        />
    );
};

export default ExamBuilder;
