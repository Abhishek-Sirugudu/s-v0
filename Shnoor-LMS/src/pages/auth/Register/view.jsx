import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import brandLogo from '../../../assets/SHnoor_logo_1.jpg';
import markLogo from '../../../assets/just_logo.jpeg';

const RegisterView = ({
    formData,
    error,
    loading,
    successMessage,
    showPassword,
    showConfirmPassword,
    handleChange,
    handleRegister,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility
}) => {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Brand Section (Left) - Hidden on mobile */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 lg:w-[45%] bg-[#003B5C] text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="z-10 text-center max-w-lg">
                    <img
                        src={brandLogo}
                        alt="SHNOOR Logo"
                        className="w-48 mb-8 rounded-xl shadow-2xl mx-auto border-4 border-white/10"
                    />
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Join Our Community</h2>
                    <p className="text-blue-100 text-lg leading-relaxed">
                        Start your learning journey today with expert-led courses and hands-on practice.
                    </p>
                </div>
            </div>

            {/* Form Section (Right) */}
            <div className="flex-1 flex items-center justify-center p-6 bg-white md:bg-transparent">
                <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl md:shadow-xl md:border border-slate-100">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <img
                                src={markLogo}
                                alt="SHNOOR International"
                                className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="text-left">
                                <h1 className="text-[#003B5C] text-xl font-bold tracking-tight leading-none">
                                    SHNOOR
                                </h1>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">International</p>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                        <p className="text-slate-500 text-sm mt-2">Join SHNOOR LMS today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-lg flex items-center gap-2">
                            <span className="font-bold">Success:</span> {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 focus:border-[#003B5C] transition-all text-sm font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 focus:border-[#003B5C] transition-all text-sm font-medium"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Role
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 focus:border-[#003B5C] transition-all text-sm font-medium appearance-none cursor-pointer"
                                >
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 focus:border-[#003B5C] transition-all text-sm font-medium pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 focus:border-[#003B5C] transition-all text-sm font-medium pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#E8AA25] hover:bg-[#d69919] text-[#003B5C] font-bold rounded-lg shadow-sm hover:shadow-md transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#003B5C]/30 border-t-[#003B5C] rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <FaUserPlus />
                                    <span>Create Account</span>
                                </>
                            )}
                        </button>

                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#003B5C] font-bold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterView;
