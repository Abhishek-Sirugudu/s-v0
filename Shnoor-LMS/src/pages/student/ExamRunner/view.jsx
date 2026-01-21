import React from 'react';
import { FaClock, FaAngleLeft, FaAngleRight, FaTrophy, FaTimesCircle, FaCheckCircle, FaCode } from 'react-icons/fa';
import PracticeSession from '../PracticeSession'; // Assuming PracticeSession is a separate component

const ExamRunnerView = ({
    loading, exam,
    currentQIndex, setCurrentQIndex,
    answers, handleAnswer,
    timeLeft, isSubmitted, result,
    handleSubmit, formatTime, navigate
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading Assessment...</p>
            </div>
        </div>
    );
    if (!exam) return <div className="p-8 text-center text-red-500 font-bold">Exam not found.</div>;

    if (isSubmitted && result) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] p-6 bg-slate-50">
                <div className="bg-white p-12 rounded-3xl shadow-lg border border-slate-200 w-full max-w-2xl text-center">
                    {result.passed ? (
                        <div className="space-y-6">
                            <FaTrophy size={80} className="text-amber-400 mx-auto drop-shadow-md animate-bounce-slow" />
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Excellent Work!</h2>
                                <p className="text-xl text-slate-600">You passed <strong className="text-slate-900">{exam.title}</strong></p>
                            </div>
                            <div className="text-7xl font-bold text-emerald-500 font-mono tracking-tight">
                                {result.percentage}%
                            </div>
                            <div className="bg-emerald-50 text-emerald-700 py-3 rounded-xl font-medium border border-emerald-100">
                                Your certificate has been generated.
                            </div>
                            <div className="flex gap-4 justify-center pt-4">
                                <button className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors" onClick={() => navigate('/student/dashboard')}>Back to Home</button>
                                <button
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                                    onClick={() => navigate('/student/certificates')}
                                >
                                    View Certificate
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <FaTimesCircle size={80} className="text-red-500 mx-auto drop-shadow-md" />
                            <div>
                                <h2 className="text-3xl font-bold text-slate-800 mb-2">Assessment Failed</h2>
                                <p className="text-xl text-slate-600">You scored</p>
                            </div>
                            <div className="text-7xl font-bold text-red-500 font-mono tracking-tight">
                                {result.percentage}%
                            </div>
                            <p className="text-slate-500">Required to pass: {exam.passScore}%</p>
                            <div className="flex gap-4 justify-center pt-4">
                                <button className="px-6 py-3 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors" onClick={() => navigate('/student/dashboard')}>Back to Home</button>
                                <button
                                    className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all"
                                    onClick={() => window.location.reload()}
                                >
                                    Retake Exam
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const currentQ = exam.questions[currentQIndex];
    const isPractice = exam.duration === 0;

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col bg-slate-50">
            {/* Header */}
            <div className="h-16 bg-slate-900 text-white px-6 flex items-center justify-between shrink-0 shadow-md z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => { if (window.confirm("Quit exam? Progress will be lost.")) navigate(-1); }}
                        className="text-white/70 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        <FaAngleLeft size={20} /> <span className="text-sm font-medium">Exit</span>
                    </button>
                    <div className="h-6 w-px bg-white/20"></div>
                    <h3 className="text-lg font-bold truncate max-w-md">{exam.title}</h3>
                </div>

                {!isPractice && (
                    <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full flex items-center gap-2 font-mono font-bold text-lg border transition-all ${timeLeft < 300
                                ? 'bg-red-500/20 text-red-300 border-red-500/50 animate-pulse'
                                : 'bg-white/10 text-white border-white/10'
                            }`}>
                            <FaClock size={16} /> {formatTime(timeLeft)}
                        </span>
                        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition-colors" onClick={handleSubmit}>
                            Finish Test
                        </button>
                    </div>
                )}
            </div>

            {/* Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 overflow-y-auto hidden md:flex">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                        Progress
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-8">
                        {exam.questions.map((q, idx) => {
                            let statusClass = 'bg-slate-100 text-slate-500 hover:bg-slate-200';
                            if (idx === currentQIndex) statusClass = 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2';
                            else if (answers[idx]) statusClass = 'bg-emerald-100 text-emerald-700 border border-emerald-200';

                            return (
                                <button
                                    key={q.id}
                                    onClick={() => setCurrentQIndex(idx)}
                                    className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm transition-all ${statusClass}`}
                                    title={`Question ${idx + 1}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-auto space-y-3 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded bg-blue-600 ring-2 ring-blue-600 ring-offset-1"></div> Current
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></div> Answered
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded bg-slate-100"></div> Unvisited
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className={`flex-1 overflow-y-auto ${currentQ.type === 'coding' ? 'p-0' : 'p-6 md:p-10'} flex flex-col items-center bg-slate-50/50`}>

                    {currentQ.type === 'descriptive' ? (
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full md:h-auto min-h-[500px]">
                            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start gap-4">
                                <div>
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Question {currentQIndex + 1}</span>
                                    <p className="text-xl md:text-2xl font-medium text-slate-800 mt-2 leading-relaxed">{currentQ.text}</p>
                                </div>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold whitespace-nowrap">
                                    {currentQ.marks} Marks
                                </span>
                            </div>

                            <div className="p-6 md:p-8 flex-1">
                                <textarea
                                    className="w-full h-full min-h-[300px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none transition-all text-lg"
                                    placeholder="Type your answer here..."
                                    value={answers[currentQIndex] || ''}
                                    onChange={(e) => handleAnswer(e.target.value)}
                                />
                            </div>

                            <div className="p-6 md:p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-b-2xl">
                                <button
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all ${currentQIndex === 0 ? 'invisible' : ''}`}
                                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                                >
                                    <FaAngleLeft /> Previous
                                </button>

                                {currentQIndex < exam.questions.length - 1 ? (
                                    <button
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                                    >
                                        Next <FaAngleRight />
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all"
                                        onClick={handleSubmit}
                                    >
                                        Submit Test
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : currentQ.type === 'coding' ? (
                        <div className="flex flex-col h-full w-full">
                            <div className="flex-1 overflow-hidden relative">
                                <PracticeSession
                                    question={currentQ}
                                    value={answers[currentQIndex]}
                                    onChange={(val) => handleAnswer(val)}
                                    onComplete={() => { }}
                                />
                            </div>
                            <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center shrink-0">
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all ${currentQIndex === 0 ? 'invisible' : ''}`}
                                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                                >
                                    <FaAngleLeft /> Previous
                                </button>
                                {currentQIndex < exam.questions.length - 1 ? (
                                    <button
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-500 transition-all"
                                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                                    >
                                        Next <FaAngleRight />
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-all"
                                        onClick={handleSubmit}
                                    >
                                        Submit Test
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full md:h-auto overflow-hidden">
                            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-start gap-4 bg-slate-50/50">
                                <div>
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Question {currentQIndex + 1}</span>
                                    <p className="text-xl md:text-2xl font-medium text-slate-800 mt-2 leading-relaxed">{currentQ.text}</p>
                                </div>
                                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold whitespace-nowrap shadow-sm">
                                    {currentQ.marks} Marks
                                </span>
                            </div>

                            <div className="p-6 md:p-8 flex-1 grid gap-4">
                                {currentQ.options.map((opt, i) => (
                                    <label
                                        key={i}
                                        className={`group flex items-center gap-4 p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${answers[currentQIndex] === opt
                                                ? 'border-blue-500 bg-blue-50/50'
                                                : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${answers[currentQIndex] === opt
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-slate-300 group-hover:border-blue-400'
                                            }`}>
                                            {answers[currentQIndex] === opt && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name={`q-${currentQ.id}`}
                                            value={opt}
                                            checked={answers[currentQIndex] === opt}
                                            onChange={() => handleAnswer(opt)}
                                            className="hidden"
                                        />
                                        <span className={`text-lg transition-colors ${answers[currentQIndex] === opt
                                                ? 'text-blue-700 font-bold'
                                                : 'text-slate-600 font-medium group-hover:text-slate-800'
                                            }`}>{opt}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="p-6 md:p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
                                <button
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all ${currentQIndex === 0 ? 'invisible' : ''}`}
                                    onClick={() => setCurrentQIndex(prev => prev - 1)}
                                >
                                    <FaAngleLeft /> Previous
                                </button>

                                {currentQIndex < exam.questions.length - 1 ? (
                                    <button
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
                                        onClick={() => setCurrentQIndex(prev => prev + 1)}
                                    >
                                        Next <FaAngleRight />
                                    </button>
                                ) : (
                                    <button
                                        className="flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all"
                                        onClick={handleSubmit}
                                    >
                                        Submit Test
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamRunnerView;
