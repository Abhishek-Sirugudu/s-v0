import React, { useState, useEffect } from 'react';
import CertificateConfigView from './view';

const CertificateConfig = () => {
    const [config, setConfig] = useState({
        templateUrl: '',
        signatureUrl: '',
        authorityName: 'Director of Education',
        issuerName: 'SHNOOR LMS'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setTimeout(() => {
                    setConfig({
                        templateUrl: 'https://example.com/cert-template.png',
                        signatureUrl: 'https://example.com/signature.png',
                        authorityName: 'Director of Education',
                        issuerName: 'SHNOOR LMS'
                    });
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error("Error fetching config:", error);
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            alert("Certificate configuration saved successfully!");
        } catch (error) {
            console.error("Error saving config:", error);
            alert("Failed to save configuration.");
        }
    };

    return (
        <CertificateConfigView
            loading={loading}
            config={config}
            setConfig={setConfig}
            handleSave={handleSave}
        />
    );
};

export default CertificateConfig;
