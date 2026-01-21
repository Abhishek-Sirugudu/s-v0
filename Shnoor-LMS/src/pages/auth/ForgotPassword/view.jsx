import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordView = ({
    email,
    setEmail,
    message,
    error,
    loading,
    handleReset
}) => {
    return (
        <div className="min-h-screen flex text-slate-800 font-sans bg-slate-50">
            {/* Brand Section (Left) - Hidden on mobile */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 lg:w-[45%] bg-[#003B5C] text-white p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="z-10 text-center max-w-lg">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                        🔒
                    </div>
                    <h2 className="text-3xl font-bold mb-4 tracking-tight">Security First</h2>
                    <p className="text-blue-100 text-lg leading-relaxed mb-8">
                        We value your security. Follow the instructions to securely reset your password
                        and regain access to your SHNOOR Dashboard.
                    </p>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-left">
                        <p className="italic text-blue-50">"The support team helped me recover my account in minutes. Great service!"</p>
                        <p className="text-sm font-bold mt-4 text-white">- James Wilson, Administrator</p>
                    </div>
                </div>
            </div>

            {/* Form Section (Right) */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl md:shadow-xl md:border border-slate-100">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 text-xl shadow-sm border border-amber-100">
                            🔑
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Reset Password</h2>
                        <p className="text-slate-500 text-sm mt-2">Enter your email to receive reset instructions.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-pulse">
                            <span className="font-bold">Error:</span> {error}
                        </div>
                    )}

                    {message && (
                        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-lg flex items-center gap-2 text-center justify-center">
                            ✅ {message}
                        </div>
                    )}

                    <form onSubmit={handleReset} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003B5C]/20 focus:border-[#003B5C] transition-all text-sm font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#003B5C] hover:bg-[#002e48] text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Sending Link...</span>
                                </>
                            ) : (
                                <span>Reset Password</span>
                            )}
                        </button>

                        <div className="text-center border-t border-slate-100 pt-6 mt-6">
                            <p className="text-sm text-slate-500">
                                Remembered your password?{' '}
                                <Link to="/" className="text-[#003B5C] font-bold hover:underline">
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

export default ForgotPasswordView;
