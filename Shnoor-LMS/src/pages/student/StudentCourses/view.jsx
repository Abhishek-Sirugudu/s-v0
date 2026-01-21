import React from 'react';
import { FaBookReader, FaSearch, FaGlobe, FaBookOpen } from 'react-icons/fa';

const StudentCoursesView = ({
    loading,
    activeTab, setActiveTab,
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    selectedLevel, setSelectedLevel,
    displayCourses,
    enrolledIds,
    categories,
    handleEnroll,
    navigate
}) => {

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading catalog...</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            { }
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">{activeTab === 'my-learning' ? 'My Learning' : 'Course Catalog'}</h3>
                    <p className="text-slate-500">
                        {activeTab === 'my-learning' ? 'Continue your progress and master new skills.' : 'Browse our extensive library of professional courses.'}
                    </p>
                </div>
            </div>

            { }
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        className="flex-1 md:w-48 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <select
                        className="flex-1 md:w-40 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                    >
                        <option value="All">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>
            </div>

            { }
            <div className="flex gap-8 border-b border-slate-200 px-2">
                <button
                    className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'my-learning'
                            ? 'text-blue-600'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    onClick={() => setActiveTab('my-learning')}
                >
                    My Learning
                    {activeTab === 'my-learning' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
                    )}
                </button>
                <button
                    className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === 'explore'
                            ? 'text-blue-600'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    onClick={() => setActiveTab('explore')}
                >
                    Explore Catalog
                    {activeTab === 'explore' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
                    )}
                </button>
            </div>

            { }
            {displayCourses.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center">
                    {activeTab === 'my-learning' ? (
                        <>
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <FaBookOpen size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No Enrolled Courses</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto">You haven't enrolled in any courses yet. Explore our catalog to start learning.</p>
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors inline-flex items-center gap-2"
                                onClick={() => setActiveTab('explore')}
                            >
                                <FaGlobe /> Browse Courses
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <FaSearch size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">No Courses Found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayCourses.map((course, index) => {
                        const isEnrolled = enrolledIds.includes(course.id);
                        const gradients = [
                            'from-blue-500 to-cyan-400',
                            'from-violet-500 to-purple-500',
                            'from-amber-400 to-orange-500',
                            'from-emerald-400 to-teal-500'
                        ];
                        const gradient = gradients[index % gradients.length];

                        return (
                            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                                {/* Thumbnail */}
                                <div className={`h-40 bg-gradient-to-br ${gradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                                    <FaBookReader className="text-white/30 text-6xl transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {course.level || 'All Levels'}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                                        {course.category}
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {course.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 mb-4 font-medium flex items-center gap-1">
                                        By <span className="text-slate-700">{course.instructorName || 'Instructor'}</span>
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                        {isEnrolled ? (
                                            <button
                                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                                onClick={() => navigate(`/student/course/${course.id}`)}
                                            >
                                                Continue Learning
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                                onClick={() => handleEnroll(course.id)}
                                            >
                                                Enroll Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentCoursesView;
