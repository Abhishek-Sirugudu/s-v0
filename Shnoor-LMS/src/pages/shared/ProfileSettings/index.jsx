import React, { useState, useEffect } from 'react';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth, db, storage } from '../../../auth/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ProfileSettingsView from './view';

const ProfileSettings = () => {
    const [userData, setUserData] = useState({
        displayName: '',
        email: '',
        bio: '',
        headline: '',
        linkedin: '',
        github: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!auth.currentUser) return;
            try {
                const docRef = doc(db, "users", auth.currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData({
                        displayName: data.displayName || auth.currentUser.displayName || '',
                        email: auth.currentUser.email || '',
                        role: data.role || 'User',
                        bio: data.bio || '',
                        headline: data.headline || '',
                        linkedin: data.linkedin || '',
                        github: data.github || ''
                    });
                }
            } catch (error) {
                console.error("Error loading profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                displayName: userData.displayName,
                bio: userData.bio,
                headline: userData.headline,
                linkedin: userData.linkedin,
                github: userData.github,
                updatedAt: new Date().toISOString()
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <ProfileSettingsView
            loading={loading}
            userData={userData}
            saving={saving}
            handleChange={handleChange}
            handleSave={handleSave}
        />
    );
};

export default ProfileSettings;
