import React from 'react';
import { FaPlus, FaVideo, FaFileAlt, FaArrowRight, FaArrowLeft, FaSave, FaTrash, FaCheck, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const AddCourseView = ({
    step, setStep, loading,
    courseData, handleCourseChange,
    moduleForm, handleModuleChange,
    isCustomCategory,
    videoInputType, setVideoInputType,
    pdfInputType, setPdfInputType,
    handleFileUpload, uploading, uploadProgress,
    addModule, removeModule, moveModule,
    handleSubmit, editCourseId
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Processing course data...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                { }
                <div className="p-8 border-b border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">
                            {editCourseId ? 'Edit Course' : 'Create New Course'}
                        </h3>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Step {step} of 3</span>
                    </div>

                    <div className="flex gap-2 h-2">
                        {[1, 2, 3].map(s => (
                            <div
                                key={s}
                                className={`flex-1 rounded-full transition-all duration-300 ${step >= s ? 'bg-blue-600' : 'bg-slate-200'
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="p-8">
                    { }
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Course Title <span className="text-red-500">*</span></label>
                                    <input
                                        name="title"
                                        placeholder="e.g. Mastering React.js"
                                        value={courseData.title}
                                        onChange={handleCourseChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        placeholder="What will students learn?"
                                        value={courseData.description}
                                        onChange={handleCourseChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none shadow-sm"
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Thumbnail URL</label>
                                    <input
                                        name="thumbnail"
                                        placeholder="https://example.com/image.jpg"
                                        value={courseData.thumbnail}
                                        onChange={handleCourseChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Category <span className="text-red-500">*</span></label>
                                    <select
                                        name="category"
                                        value={isCustomCategory ? 'custom' : courseData.category}
                                        onChange={handleCourseChange}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        <option value="Business">Business</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Design">Design</option>
                                        <option value="custom">+ Add New Category</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Difficulty Level <span className="text-red-500">*</span></label>
                                    <select
                                        name="level"
                                        value={courseData.level}
                                        onChange={handleCourseChange}
                                        required
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Select Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-slate-700">Validity Period <span className="text-red-500">*</span></label>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            name="validityPeriod"
                                            placeholder="e.g. 4"
                                            value={courseData.validityPeriod}
                                            onChange={handleCourseChange}
                                            required
                                            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        />
                                        <select
                                            name="validityUnit"
                                            value={courseData.validityUnit}
                                            onChange={handleCourseChange}
                                            className="w-32 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 cursor-pointer"
                                        >
                                            <option value="Days">Days</option>
                                            <option value="Weeks">Weeks</option>
                                            <option value="Months">Months</option>
                                            <option value="Years">Years</option>
                                        </select>
                                    </div>
                                </div>

                                {isCustomCategory && (
                                    <div className="space-y-2 md:col-span-2 animate-fade-in">
                                        <label className="text-sm font-bold text-slate-700">New Category Name</label>
                                        <input
                                            name="customCategory"
                                            placeholder="e.g. Cyber Security"
                                            value={courseData.customCategory}
                                            onChange={handleCourseChange}
                                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => setStep(2)}
                                    disabled={!courseData.title || (!courseData.category && !courseData.customCategory) || !courseData.level}
                                >
                                    Next: Add Content <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    )}

                    { }
                    {step === 2 && (
                        <div className="space-y-8">
                            { }
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h4 className="text-lg font-bold text-slate-800 mb-4">Add New Module</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Module Title</label>
                                        <input
                                            name="title"
                                            placeholder="e.g. Introduction Video"
                                            value={moduleForm.title}
                                            onChange={handleModuleChange}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                                        <select
                                            name="type"
                                            value={moduleForm.type}
                                            onChange={handleModuleChange}
                                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                        >
                                            <option value="video">Video</option>
                                            <option value="pdf">PDF Document</option>
                                        </select>
                                    </div>

                                    { }
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Content Source</label>
                                        <div className="flex gap-2 mb-2">
                                            <button
                                                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${videoInputType === 'url' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                                                    }`}
                                                onClick={() => setVideoInputType('url')}
                                            >
                                                External Link
                                            </button>
                                            <button
                                                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${videoInputType === 'upload' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                                                    }`}
                                                onClick={() => setVideoInputType('upload')}
                                            >
                                                Upload File
                                            </button>
                                        </div>

                                        {videoInputType === 'url' ? (
                                            <input
                                                name="url"
                                                placeholder={moduleForm.type === 'video' ? "YouTube / Drive URL" : "PDF Link"}
                                                value={moduleForm.url}
                                                onChange={handleModuleChange}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                            />
                                        ) : (
                                            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 bg-white text-center">
                                                <input
                                                    type="file"
                                                    accept={moduleForm.type === 'video' ? "video/*" : "application/pdf"}
                                                    onChange={(e) => handleFileUpload(e.target.files[0], 'url')}
                                                    disabled={uploading}
                                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-2"
                                                />
                                                {uploading && videoInputType === 'upload' && (
                                                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                                                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                                                    </div>
                                                )}
                                                {moduleForm.url && videoInputType === 'upload' && !uploading && (
                                                    <div className="text-xs text-green-600 font-bold flex items-center justify-center gap-1 mt-2">
                                                        <FaCheck /> File uploaded!
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    { }
                                    {moduleForm.type === 'video' && (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Duration (mins)</label>
                                            <input
                                                type="number"
                                                name="duration"
                                                placeholder="e.g. 15"
                                                value={moduleForm.duration}
                                                onChange={handleModuleChange}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    )}

                                    { }
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Resources (Optional)</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <textarea
                                                name="notes"
                                                placeholder="Add notes..."
                                                rows="2"
                                                value={moduleForm.notes}
                                                onChange={handleModuleChange}
                                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none resize-none"
                                            />
                                            <div>
                                                <input
                                                    name="pdfUrl"
                                                    placeholder="Resource Link/URL"
                                                    value={moduleForm.pdfUrl}
                                                    onChange={handleModuleChange}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:border-blue-500 outline-none mb-2"
                                                />
                                                <div className="text-xs text-slate-400">Add a link to supplementary material</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 pt-2">
                                        <button
                                            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                            onClick={addModule}
                                            disabled={!moduleForm.title || !moduleForm.url}
                                        >
                                            <FaPlus /> Add Module
                                        </button>
                                    </div>
                                </div>
                            </div>

                            { }
                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Course Modules ({courseData.modules.length})</h3>
                                {courseData.modules.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                                        No modules added yet. Use the form above to add content.
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
                                                    <th className="px-4 py-3 font-bold">Type</th>
                                                    <th className="px-4 py-3 font-bold">Title</th>
                                                    <th className="px-4 py-3 font-bold">Duration</th>
                                                    <th className="px-4 py-3 font-bold text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {courseData.modules.map((m, idx) => (
                                                    <tr key={m.id} className="hover:bg-slate-50">
                                                        <td className="px-4 py-3 text-slate-600">
                                                            {m.type === 'video' ? <FaVideo className="text-red-500" /> : <FaFileAlt className="text-blue-500" />}
                                                        </td>
                                                        <td className="px-4 py-3 font-medium text-slate-900">{m.title}</td>
                                                        <td className="px-4 py-3 text-slate-500 text-sm">{m.type === 'video' ? `${m.duration}m` : '-'}</td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors disabled:opacity-30"
                                                                    onClick={() => moveModule(idx, -1)}
                                                                    disabled={idx === 0}
                                                                >
                                                                    <FaArrowUp size={12} />
                                                                </button>
                                                                <button
                                                                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded transition-colors disabled:opacity-30"
                                                                    onClick={() => moveModule(idx, 1)}
                                                                    disabled={idx === courseData.modules.length - 1}
                                                                >
                                                                    <FaArrowDown size={12} />
                                                                </button>
                                                                <button
                                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                                    onClick={() => removeModule(m.id)}
                                                                >
                                                                    <FaTrash size={12} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-6 border-t border-slate-100">
                                <button className="px-6 py-2.5 bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2" onClick={() => setStep(1)}>
                                    <FaArrowLeft /> Back
                                </button>
                                <button className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 flex items-center gap-2" onClick={() => setStep(3)}>
                                    Next: Review <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    )}

                    { }
                    {step === 3 && (
                        <div className="space-y-8 text-center max-w-2xl mx-auto">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Submit?</h2>
                                <p className="text-slate-500">Please review your course details before finalizing.</p>
                            </div>

                            <div className="bg-slate-50 p-8 rounded-2xl text-left space-y-3 border border-slate-200">
                                <div className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 font-medium">Title</span>
                                    <span className="font-bold text-slate-900">{courseData.title}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 font-medium">Category</span>
                                    <span className="font-bold text-slate-900">{isCustomCategory ? courseData.customCategory : courseData.category}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 font-medium">Level</span>
                                    <span className="font-bold text-slate-900">{courseData.level}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 font-medium">Validity</span>
                                    <span className="font-bold text-slate-900">{courseData.validityPeriod} {courseData.validityUnit}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-200 pb-2">
                                    <span className="text-slate-500 font-medium">Total Modules</span>
                                    <span className="font-bold text-slate-900">{courseData.modules.length}</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span className="text-slate-500 font-medium">Total Duration</span>
                                    <span className="font-bold text-blue-600">{courseData.modules.reduce((acc, m) => acc + Number(m.duration || 0), 0)} mins</span>
                                </div>
                            </div>

                            <div className="flex justify-between pt-6">
                                <button className="px-6 py-2.5 bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2" onClick={() => setStep(2)}>
                                    <FaArrowLeft /> Back
                                </button>
                                <div className="flex gap-4">
                                    <button
                                        className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 flex items-center gap-2"
                                        onClick={() => handleSubmit('draft')}
                                    >
                                        <FaSave /> Save Draft
                                    </button>
                                    <button
                                        className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg shadow-green-500/20 flex items-center gap-2"
                                        onClick={() => handleSubmit('pending')}
                                    >
                                        <FaCheck /> Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddCourseView;
