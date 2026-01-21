import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddInstructorView from './view';

const AddInstructor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        fullName: '',
        email: '',
        subject: '',
        phone: '',
        bio: ''
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            setTimeout(() => {
                alert(`Instructor "${data.fullName}" added.\n\nAction would normally create user: "${data.email}"`);
                navigate('/admin/dashboard');
                setLoading(false);
            }, 1000);

        } catch (error) {
            console.error("Error adding instructor:", error);
            alert("Failed to add instructor: " + error.message);
            setLoading(false);
        }
    };

    return (
        <AddInstructorView
            loading={loading}
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            navigate={navigate}
        />
    );
};

export default AddInstructor;
