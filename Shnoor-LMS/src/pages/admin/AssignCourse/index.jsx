import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, db } from '../../../auth/firebase';
import AssignCourseView from './view';

const AssignCourse = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [searchStudent, setSearchStudent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const usersRef = collection(db, "users");
                const qUsers = query(usersRef, where("role", "==", "student"));
                const querySnapshotUsers = await getDocs(qUsers);
                const studentsList = [];
                querySnapshotUsers.forEach((doc) => {
                    studentsList.push({ id: doc.id, name: doc.data().displayName || 'No Name', email: doc.data().email });
                });

                const coursesRef = collection(db, "courses");
                const qCourses = query(coursesRef, where("status", "==", "published"));
                const querySnapshotCourses = await getDocs(qCourses);
                const coursesList = [];
                querySnapshotCourses.forEach((doc) => {
                    coursesList.push({ id: doc.id, title: doc.data().title, instructor: doc.data().instructorName });
                });

                setStudents(studentsList);
                setCourses(coursesList);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleStudent = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        );
    };

    const toggleCourse = (id) => {
        setSelectedCourses(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        if (selectedStudents.length === 0 || selectedCourses.length === 0) {
            alert("Please select at least one student and one course.");
            return;
        }

        try {
            const promises = selectedStudents.map(studentId => {
                const studentRef = doc(db, "users", studentId);
                return updateDoc(studentRef, {
                    enrolledCourses: arrayUnion(...selectedCourses)
                });
            });

            await Promise.all(promises);

            // alert(`Successfully assigned courses...`);
            setSelectedStudents([]);
            setSelectedCourses([]);

        } catch (error) {
            // Error assigning
        }
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
        s.email.toLowerCase().includes(searchStudent.toLowerCase())
    );

    return (
        <AssignCourseView
            loading={loading}
            filteredStudents={filteredStudents}
            courses={courses}
            selectedStudents={selectedStudents}
            selectedCourses={selectedCourses}
            searchStudent={searchStudent}
            setSearchStudent={setSearchStudent}
            toggleStudent={toggleStudent}
            toggleCourse={toggleCourse}
            handleAssign={handleAssign}
        />
    );
};

export default AssignCourse;
