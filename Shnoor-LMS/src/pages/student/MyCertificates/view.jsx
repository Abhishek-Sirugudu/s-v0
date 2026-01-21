import React from 'react';
import { FaTrophy, FaCertificate, FaDownload, FaPrint, FaArrowLeft } from 'react-icons/fa';

const MyCertificatesView = ({ loading, currentUser, certificates, selectedCert, setSelectedCert, handlePrint }) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading achievements...</p>
            </div>
        </div>
    );

    if (selectedCert) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200 print:hidden">
                    <button
                        onClick={() => setSelectedCert(null)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-all"
                    >
                        <FaArrowLeft /> Back to List
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all"
                    >
                        <FaPrint /> Print / Save as PDF
                    </button>
                </div>

                <div
                    className="bg-white border-[15px] border-blue-900 mx-auto text-center relative shadow-2xl print:shadow-none print:border-0 print:w-full print:absolute print:top-0 print:left-0"
                    style={{
                        width: '900px',
                        height: '650px',
                        padding: '50px',
                        fontFamily: "'Playfair Display', serif",
                        color: '#1f2937'
                    }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0"></div>

                    <div className="relative z-10 h-full flex flex-col justify-center items-center">

                        <FaCertificate size={60} className="text-amber-400 mb-2" />
                        <div className="text-xl uppercase tracking-[4px] text-slate-500 mb-1">
                            Certificate of Completion
                        </div>
                        <h1 className="text-6xl text-blue-900 my-4 font-serif italic" style={{ fontFamily: "'Times New Roman', serif" }}>
                            {selectedCert.courseName}
                        </h1>

                        <p className="text-2xl text-slate-600 my-4 italic">This certifies that</p>

                        <h2 className="text-4xl border-b-2 border-slate-300 pb-2 mb-8 min-w-[500px] font-bold">
                            {currentUser.name}
                        </h2>

                        <p className="text-xl text-slate-600 max-w-[700px] leading-relaxed">
                            Has demonstrated proficiency in the curriculum and successfully passed the required assessments with a score of <strong>{selectedCert.score}%</strong>.
                        </p>

                        <div className="flex justify-between w-[80%] mt-auto mb-5">
                            <div className="text-center">
                                <div className="text-3xl text-blue-900 mb-1 font-cursive" style={{ fontFamily: "cursive" }}>{selectedCert.instructor}</div>
                                <div className="border-t border-slate-400 pt-1 w-[200px] mx-auto text-sm text-slate-500">Lead Instructor</div>
                            </div>

                            <div className="text-center">
                                <div className="text-xl mb-2 mt-2">{selectedCert.issueDate}</div>
                                <div className="border-t border-slate-400 pt-1 w-[200px] mx-auto text-sm text-slate-500">Date Issued</div>
                            </div>
                        </div>

                        <div className="text-xs text-slate-400 mt-5">
                            Credential ID: {selectedCert.id.toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">My Achievements</h3>
                    <p className="text-slate-500 mt-1">Track your progress and earned credentials.</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm border border-blue-100 shadow-sm">
                    <FaTrophy className="text-blue-500" /> {currentUser?.xp} XP Earned
                </div>
            </div>

            <h4 className="text-lg font-bold text-slate-800 uppercase tracking-wide mb-6">Verified Certificates</h4>

            {certificates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center">
                    <FaCertificate className="text-slate-300 text-6xl mb-4" />
                    <h3 className="text-xl font-bold text-slate-700 mb-2">No Certificates Yet</h3>
                    <p className="text-slate-500">Complete courses and pass exams to earn official certificates.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {certificates.map((cert, idx) => {
                        
                        const gradients = [
                            'from-blue-600 to-blue-400',
                            'from-purple-600 to-purple-400',
                            'from-emerald-600 to-emerald-400',
                            'from-amber-500 to-amber-400'
                        ];
                        const gradientClass = gradients[idx % gradients.length];

                        return (
                            <div
                                key={cert.id}
                                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
                                onClick={() => setSelectedCert(cert)}
                            >
                                <div className={`h-48 bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center text-white p-4 relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50"></div>
                                    <FaCertificate size={50} className="mb-3 text-amber-300 drop-shadow-md relative z-10" />
                                    <div className="font-serif text-xl tracking-[2px] font-bold relative z-10 border-t border-b border-white/30 py-1">CERTIFICATE</div>
                                </div>

                                <div className="p-6 flex flex-col flex-1 bg-white relative">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{cert.courseName}</h4>
                                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-6">
                                        Issued: {cert.issueDate}
                                    </p>

                                    <button
                                        className="w-full mt-auto bg-slate-900 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10"
                                        onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
                                    >
                                        <FaDownload /> View / Print
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyCertificatesView;
