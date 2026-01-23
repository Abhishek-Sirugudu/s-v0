import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import ApproveUsersView from './view';

const ApproveUsers = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "users"),
                where("accountStatus", "==", "pending")
            );

            const querySnapshot = await getDocs(q);
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({ id: doc.id, ...doc.data() });
            });

            users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setPendingUsers(users);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching pending users:", error);
            setLoading(false);
        }
    };

    const handleAction = async (userId, action, userName) => {
        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                accountStatus: action === 'active' ? 'active' : 'rejected'
            });

            setPendingUsers(prev => prev.filter(user => user.id !== userId));

        } catch (error) {
            // Error handling
        }
    };

    return (
        <ApproveUsersView
            loading={loading}
            pendingUsers={pendingUsers}
            handleAction={handleAction}
        />
    );
};

export default ApproveUsers;
