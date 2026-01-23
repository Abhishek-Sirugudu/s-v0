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
            // TODO: [Backend] Create user via Cloud Function or Secondary Admin SDK
            // Client SDK cannot create other users directly.
            // await createUser(data);

            navigate('/admin/dashboard');
        } catch (error) {
            // Error handling
        } finally {
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
