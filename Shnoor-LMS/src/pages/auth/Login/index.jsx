import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../../../auth/firebase';
import LoginView from './view';

const Login = () => {
    const navigate = useNavigate();

    
    const [email, setEmail] = useState(() => {
        if (typeof window === 'undefined') return '';
        const saved = localStorage.getItem('rememberedEmail');
        return saved && saved !== 'admin@shnoor.com' ? saved : '';
    });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(() => {
        if (typeof window === 'undefined') return false;
        const saved = localStorage.getItem('rememberedEmail');
        return !!(saved && saved !== 'admin@shnoor.com');
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const checkRoleAndRedirect = async (user) => {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const { role, accountStatus } = userData;

                if (accountStatus === 'pending' || accountStatus === 'rejected') {
                    await auth.signOut();
                    setError("Access Denied: Your account is pending Admin approval.");
                    setLoading(false);
                    return;
                }

                if (role === 'admin') navigate('/admin/dashboard');
                else if (role === 'student' || role === 'learner') navigate('/student/dashboard');
                else if (role === 'instructor' || role === 'company') navigate('/instructor/dashboard');
                else navigate('/instructor/dashboard');
            } else {
                if (user.email.includes('admin')) navigate('/admin/dashboard');
                else navigate('/instructor/dashboard');
            }
        } catch (err) {
            console.error("Role check failed:", err);
            setError("Failed to retrieve user profile.");
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (rememberMe) localStorage.setItem('rememberedEmail', email);
            else localStorage.removeItem('rememberedEmail');

            await checkRoleAndRedirect(userCredential.user);
        } catch (err) {
            console.error(err);
            setError("Invalid Email or Password.");
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    role: 'student',
                    xp: 0,
                    rank: 'Novice',
                    streak: 0,
                    createdAt: new Date().toISOString(),
                    accountStatus: 'pending'
                });

                await auth.signOut();
                setError("Account created successfully. Your account is pending Admin approval.");
                setLoading(false);
                return;
            }

            await checkRoleAndRedirect(user);

        } catch (err) {
            console.error(err);
            setError("Google Sign-In Failed.");
            setLoading(false);
        }
    };

    const onTogglePassword = () => setShowPassword(!showPassword);

    return (
        <LoginView
            formData={{ email, password, rememberMe }}
            setFormData={{ setEmail, setPassword, setRememberMe }}
            showPassword={showPassword}
            onTogglePassword={onTogglePassword}
            error={error}
            loading={loading}
            handleLogin={handleLogin}
            handleGoogleSignIn={handleGoogleSignIn}
        />
    );
};

export default Login;
