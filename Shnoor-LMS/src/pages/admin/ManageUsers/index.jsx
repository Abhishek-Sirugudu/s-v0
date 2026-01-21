import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../../auth/firebase';
import ManageUsersView from './view';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersRef = collection(db, "users");

            const q = query(usersRef, orderBy("email"));
            const querySnapshot = await getDocs(q);
            const usersList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersList);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        if (!window.confirm(`Are you sure you want to ${newStatus === 'suspended' ? 'suspend' : 'activate'} this user?`)) return;

        try {
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                accountStatus: newStatus
            });


            setUsers(users.map(user =>
                user.id === userId ? { ...user, accountStatus: newStatus } : user
            ));
            alert(`User ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully.`);
        } catch (error) {
            console.error("Error updating user status:", error);
            alert("Failed to update status.");
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.displayName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    return (
        <ManageUsersView
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterRole={filterRole}
            setFilterRole={setFilterRole}
            filteredUsers={filteredUsers}
            handleStatusChange={handleStatusChange}
        />
    );
};

export default ManageUsers;
