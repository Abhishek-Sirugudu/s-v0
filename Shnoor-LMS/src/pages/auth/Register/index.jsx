import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../auth/firebase';
import RegisterView from './view';

const Register = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({ ...prev, role }));
        setStep(2);
        setError('');
    };

    const handleBack = () => {
        setStep(1);
        setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: formData.fullName,
                email: user.email,
                role: formData.role,
                createdAt: new Date().toISOString(),
                xp: 0,
                accountStatus: 'pending'
            });

            setSuccessMessage("Account created successfully. Your account is pending Admin approval.");

            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use.");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <RegisterView
            step={step}
            setStep={setStep}
            formData={formData}
            error={error}
            loading={loading}
            successMessage={successMessage}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            handleChange={handleChange}
            handleRoleSelect={handleRoleSelect}
            handleBack={handleBack}
            handleRegister={handleRegister}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
        />
    );
};

export default Register;
