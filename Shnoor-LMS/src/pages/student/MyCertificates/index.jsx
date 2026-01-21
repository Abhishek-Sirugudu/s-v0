import React, { useState, useEffect } from 'react';
import { getStudentData } from '../../../utils/studentData';
import MyCertificatesView from './view';

const MyCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            setTimeout(() => {
                const data = getStudentData();
                setCurrentUser(data.currentUser);
                setCertificates(data.certificates || []);
                setLoading(false);
            }, 600);
        };
        fetchCertificates();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <MyCertificatesView
            loading={loading}
            currentUser={currentUser}
            certificates={certificates}
            selectedCert={selectedCert}
            setSelectedCert={setSelectedCert}
            handlePrint={handlePrint}
        />
    );
};

export default MyCertificates;
