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
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

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
                        github: data.github || '',
                        photoURL: data.photoURL || auth.currentUser.photoURL || ''
                    });
                    setPreviewUrl(data.photoURL || auth.currentUser.photoURL || '');
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!auth.currentUser) return;

        setUploading(true);
        try {
            const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
            const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            setPreviewUrl(downloadURL);
            setUserData(prev => ({ ...prev, photoURL: downloadURL }));

            // Update Auth Profile
            await updateProfile(auth.currentUser, { photoURL: downloadURL });

            // Update Firestore immediately for persistence
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                photoURL: downloadURL
            });

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!auth.currentUser) return;
        setSaving(true);
        try {
            const updates = {
                displayName: userData.displayName,
                bio: userData.bio,
                headline: userData.headline,
                linkedin: userData.linkedin,
                github: userData.github,
                updatedAt: new Date().toISOString()
            };

            if (userData.photoURL) {
                updates.photoURL = userData.photoURL;
            }

            await updateDoc(doc(db, "users", auth.currentUser.uid), updates);

            // Also update Auth profile display name if changed
            if (userData.displayName !== auth.currentUser.displayName) {
                await updateProfile(auth.currentUser, { displayName: userData.displayName });
            }

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
            handleImageUpload={handleImageUpload}
            uploading={uploading}
            previewUrl={previewUrl}
        />
    );
};

export default ProfileSettings;
