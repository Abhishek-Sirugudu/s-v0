import React from 'react';
import { FaSave, FaArrowRight, FaArrowLeft, FaTrash, FaPlus, FaCode, FaListUl, FaExclamationCircle, FaAlignLeft } from 'react-icons/fa';
import Editor from '@monaco-editor/react';

const ExamBuilderView = ({
    step, setStep, loading,
    instructorCourses, formData,
    handleInputChange, addQuestion, updateQuestion, removeQuestion,
    handleSave, navigate
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Saving exam...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Create Final Exam</h2>
                <button
                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    onClick={() => navigate('/instructor/dashboard')}
                >
                    Cancel
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-200">
                    <button
                        onClick={() => setStep(1)}
                        className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${step === 1
                                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        1. Configuration
                    </button>
                    <button
                        onClick={() => setStep(2)}
                        className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors border-b-2 ${step === 2
                                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        2. Questions ({formData.questions.length})
                    </button>
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 max-w-3xl mx-auto">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Exam Title</label>
                                    <input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Final Semester Exam"
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Link to Course (Optional)</label>
                                    <select
                                        name="linkedCourseId"
                                        value={formData.linkedCourseId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none cursor-pointer"
                                    >
                                        <option value="">-- No Linked Course (Standalone Exam) --</option>
                                        {instructorCourses.map(course => (
                                            <option key={course.id} value={course.id}>{course.title}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-slate-500 mt-1">If selected, the exam validity will automatically follow the course duration.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Validity (Access Period)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                name="validityPeriod"
                                                placeholder="e.g. 4"
                                                value={formData.validityPeriod}
                                                onChange={handleInputChange}
                                                disabled={!!formData.linkedCourseId}
                                                className={`flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 outline-none ${formData.linkedCourseId ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
                                                    }`}
                                            />
                                            <select
                                                name="validityUnit"
                                                value={formData.validityUnit}
                                                onChange={handleInputChange}
                                                disabled={!!formData.linkedCourseId}
                                                className={`w-28 px-2 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 outline-none ${formData.linkedCourseId ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'bg-white'
                                                    }`}
                                            >
                                                <option value="Days">Days</option>
                                                <option value="Weeks">Weeks</option>
                                                <option value="Months">Months</option>
                                                <option value="Years">Years</option>
                                            </select>
                                        </div>
                                        {formData.linkedCourseId && (
                                            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold mt-1.5">
                                                <FaExclamationCircle /> Syncs with Course Duration
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Time Limit (mins)</label>
                                            <input
                                                type="number"
                                                name="duration"
                                                value={formData.duration}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-1">Pass %</label>
                                            <input
                                                type="number"
                                                name="passPercentage"
                                                value={formData.passPercentage}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center gap-2"
                                    onClick={() => setStep(2)}
                                >
                                    Next: Add Questions <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8">
                            {/* Question Type Selector */}
                            <div className="flex justify-center gap-4 flex-wrap">
                                <button
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 font-bold rounded-lg shadow-sm transition-all"
                                    onClick={() => addQuestion('mcq')}
                                >
                                    <FaListUl /> Add MCQ
                                </button>
                                <button
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 font-bold rounded-lg shadow-sm transition-all"
                                    onClick={() => addQuestion('descriptive')}
                                >
                                    <FaAlignLeft /> Add Descriptive
                                </button>
                                <button
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 font-bold rounded-lg shadow-sm transition-all"
                                    onClick={() => addQuestion('coding')}
                                >
                                    <FaCode /> Add Coding Problem
                                </button>
                            </div>

                            {/* Questions List */}
                            <div className="space-y-6">
                                {formData.questions.map((q, index) => (
                                    <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative group hover:border-slate-300 transition-all">
                                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                onClick={() => removeQuestion(q.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="bg-slate-200 text-slate-700 px-2.5 py-1 rounded text-xs font-bold uppercase">
                                                Q{index + 1} • {q.type}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    placeholder="Marks"
                                                    className="w-20 px-2 py-1 bg-white border border-slate-200 rounded text-sm font-semibold focus:border-blue-500 outline-none"
                                                    value={q.marks}
                                                    onChange={(e) => updateQuestion(q.id, 'marks', parseInt(e.target.value) || 0)}
                                                />
                                                <span className="text-sm text-slate-500 font-medium">marks</span>
                                            </div>
                                        </div>

                                        {q.type === 'mcq' ? (
                                            <div className="space-y-4">
                                                <input
                                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none font-medium"
                                                    placeholder="Enter Question Text"
                                                    value={q.text}
                                                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                                />

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {q.options.map((opt, i) => (
                                                        <input
                                                            key={i}
                                                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                                            value={opt}
                                                            onChange={(e) => {
                                                                const newOpts = [...q.options];
                                                                newOpts[i] = e.target.value;
                                                                updateQuestion(q.id, 'options', newOpts);
                                                            }}
                                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none text-sm"
                                                        />
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-4 pt-2">
                                                    <label className="text-sm font-bold text-slate-700">Correct Answer:</label>
                                                    <select
                                                        value={q.correctAnswer}
                                                        onChange={(e) => updateQuestion(q.id, 'correctAnswer', e.target.value)}
                                                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none cursor-pointer"
                                                    >
                                                        <option value="">Select Option</option>
                                                        {q.options.map((opt, i) => (
                                                            <option key={i} value={opt}>Option {String.fromCharCode(65 + i)}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : q.type === 'descriptive' ? (
                                            <div>
                                                <textarea
                                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none font-medium resize-none"
                                                    rows={3}
                                                    placeholder="Enter the descriptive question text here..."
                                                    value={q.text}
                                                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <input
                                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none font-bold"
                                                    placeholder="Problem Title (e.g. Sum of Array)"
                                                    value={q.title}
                                                    onChange={(e) => updateQuestion(q.id, 'title', e.target.value)}
                                                />
                                                <textarea
                                                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none font-medium resize-none"
                                                    rows={3}
                                                    placeholder="Problem Description / Instructions..."
                                                    value={q.text}
                                                    onChange={(e) => updateQuestion(q.id, 'text', e.target.value)}
                                                />

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Starter Code</label>
                                                        <div className="border border-slate-300 rounded-lg overflow-hidden h-48">
                                                            <Editor
                                                                height="100%"
                                                                defaultLanguage="javascript"
                                                                language={q.language || 'javascript'}
                                                                value={q.starterCode}
                                                                onChange={(value) => updateQuestion(q.id, 'starterCode', value)}
                                                                theme="light"
                                                                options={{
                                                                    minimap: { enabled: false },
                                                                    fontSize: 14,
                                                                    scrollBeyondLastLine: false
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Language</label>
                                                            <select
                                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                                                value={q.language || 'javascript'}
                                                                onChange={(e) => updateQuestion(q.id, 'language', e.target.value)}
                                                            >
                                                                <option value="javascript">JavaScript</option>
                                                                <option value="python">Python</option>
                                                                <option value="java">Java</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <label className="text-xs font-bold text-slate-500 uppercase">Test Cases</label>
                                                                <button
                                                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                                                    onClick={() => {
                                                                        const newTestCase = { input: '', output: '', isPublic: true };
                                                                        updateQuestion(q.id, 'testCases', [...(q.testCases || []), newTestCase]);
                                                                    }}
                                                                >
                                                                    <FaPlus /> Add Case
                                                                </button>
                                                            </div>
                                                            <div className="space-y-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                                                                {(q.testCases || []).map((tc, tcIdx) => (
                                                                    <div key={tcIdx} className="flex gap-2 items-center bg-white p-2 rounded border border-slate-200">
                                                                        <input
                                                                            placeholder="Input"
                                                                            className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none"
                                                                            value={tc.input}
                                                                            onChange={(e) => {
                                                                                const newTCs = [...q.testCases];
                                                                                newTCs[tcIdx].input = e.target.value;
                                                                                updateQuestion(q.id, 'testCases', newTCs);
                                                                            }}
                                                                        />
                                                                        <input
                                                                            placeholder="Output"
                                                                            className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded focus:border-blue-500 outline-none"
                                                                            value={tc.output}
                                                                            onChange={(e) => {
                                                                                const newTCs = [...q.testCases];
                                                                                newTCs[tcIdx].output = e.target.value;
                                                                                updateQuestion(q.id, 'testCases', newTCs);
                                                                            }}
                                                                        />
                                                                        <button
                                                                            className="text-slate-400 hover:text-red-500 p-1"
                                                                            onClick={() => {
                                                                                const newTCs = q.testCases.filter((_, i) => i !== tcIdx);
                                                                                updateQuestion(q.id, 'testCases', newTCs);
                                                                            }}
                                                                        >
                                                                            <FaTrash size={10} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-6 border-t border-slate-200">
                                <button
                                    className="px-6 py-2.5 bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                                    onClick={() => setStep(1)}
                                >
                                    <FaArrowLeft /> Back
                                </button>
                                <button
                                    className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-500/20 flex items-center gap-2"
                                    onClick={handleSave}
                                >
                                    <FaSave /> Finish & Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamBuilderView;
