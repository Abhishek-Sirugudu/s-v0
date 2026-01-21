import React, { useState, useEffect } from 'react';
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db, storage } from '../../../auth/firebase';
import InstructorSettingsView from './view';

const InstructorSettings = () => {
    const [profile, setProfile] = useState({
        displayName: '',
        bio: '',
        email: ''
    });
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            fetchProfile();
        }
    }, []);

    const fetchProfile = async () => {
        setProfile({
            displayName: auth.currentUser.displayName || 'Instructor Name',
            bio: 'This is a mock bio for frontend demo.',
            email: auth.currentUser.email
        });
        setLoading(false);
    };

    const handleProfileUpdate = async () => {
        try {
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    const handlePasswordChange = async () => {
        if (passwords.new !== passwords.confirm) {
            alert("New passwords do not match.");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(auth.currentUser.email, passwords.current);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, passwords.new);
            alert("Password changed successfully!");
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (error) {
            console.error("Error changing password:", error);
            alert("Failed to change password. check your current password.");
        }
    };

    return (
        <InstructorSettingsView
            loading={loading}
            profile={profile}
            setProfile={setProfile}
            passwords={passwords}
            setPasswords={setPasswords}
            handleProfileUpdate={handleProfileUpdate}
            handlePasswordChange={handlePasswordChange}
        />
    );
};

export default InstructorSettings;
