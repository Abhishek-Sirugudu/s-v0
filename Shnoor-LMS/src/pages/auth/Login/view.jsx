import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSignInAlt, FaGoogle } from 'react-icons/fa';
import brandLogo from '../../../assets/SHnoor_logo_1.jpg';
import markLogo from '../../../assets/just_logo.jpeg';

const LoginView = ({
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    rememberMe, setRememberMe,
    error, loading,
    handleLogin, handleGoogleSignIn
}) => {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Brand Section - Left Side (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col justify-center items-center w-5/12 bg-slate-900 border-r border-slate-800 p-12 text-center text-white relative overflow-hidden">
                <div className="relative z-10 max-w-md">
                    <img
                        src={brandLogo}
                        alt="SHNOOR Logo"
                        className="w-40 mx-auto mb-8 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                    <h2 className="text-3xl font-bold mb-6 tracking-tight">Empower your institution</h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-10">
                        Streamline administration, enhance learning, and drive results with a world-class Learning Management System.
                    </p>

                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm">
                        <p className="text-slate-200 italic mb-4">"SHNOOR has completely transformed how we manage our curriculum and student progress. A true game changer!"</p>
                        <span className="text-sm font-semibold text-sky-400">- Dr. Sarah Miller, Principal</span>
                    </div>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-blue-600 blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-600 blur-[100px]"></div>
                </div>
            </div>

            {/* Form Section - Right Side */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
                <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-8 border border-slate-100 animate-fade-in-up">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <img
                                src={markLogo}
                                alt="SHNOOR International"
                                className="w-12 h-12 rounded-lg object-cover shadow-sm"
                            />
                            <div className="text-left">
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">SHNOOR</h1>
                                <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-1">International</p>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm">Sign in to continue to your dashboard.</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2 animate-shake">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@institution.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-semibold text-slate-700">Password</label>
                                <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-sm text-slate-600 cursor-pointer select-none">Remember me</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </span>
                            ) : (
                                <><FaSignInAlt /> Sign In</>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-400 font-medium">OR CONTINUE WITH</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                        >
                            <FaGoogle className="text-red-500" /> Google
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Footer safe area check */}
                <div className="absolute bottom-4 text-xs text-slate-400">
                    © 2026 SHNOOR International. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default LoginView;
