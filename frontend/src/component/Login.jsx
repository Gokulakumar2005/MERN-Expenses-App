

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenerateOTP, VerifyOTP, GoogleLogin } from '../slices/authSlices';
import { GoogleLogin as GoogleButton } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { Mail, Lock, Send, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('email'); // 'email' or 'otp'
    const dispatch = useDispatch();
    const { isLoggedIn, isLoading } = useSelector((state) => state.Auth);

    const handleGenerateOtp = (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email');
            return;
        }
        dispatch(GenerateOTP(email));
        setStep('otp');
        toast.success('OTP sent to your email!');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !otp) {
            toast.error('Please enter email and OTP');
            return;
        }
        if (otp.length !== 6) {
            toast.error('OTP should be 6 digits');
            return;
        }
        dispatch(VerifyOTP({ email, otp }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 px-4 relative overflow-hidden">

            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg mb-4">
                            <span className="font-black text-2xl text-white italic">E</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2">Welcome Back!</h1>
                        <p className="text-blue-100 text-sm">Sign in to manage your expenses</p>
                    </div>

                    {isLoggedIn ? (
                        <div className="bg-green-400/20 backdrop-blur border border-green-300/30 text-green-100 p-6 rounded-2xl text-center space-y-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-400/30 rounded-full">
                                <CheckCircle size={24} className="text-green-300" />
                            </div>
                            <p className="font-bold text-lg">Logged In Successfully!</p>
                            <p className="text-sm text-green-200">Redirecting to dashboard...</p>
                        </div>
                    ) : (
                        <form className="space-y-6">

                            {/* Step 1: Email */}
                            {step === 'email' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="space-y-3">
                                        <label className="block text-white font-bold text-sm uppercase tracking-wider">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" size={20} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-slate-400"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                        <p className="text-blue-100 text-xs">We'll send you a 6-digit code via email</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleGenerateOtp}
                                        disabled={isLoading || !email}
                                        className={`w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition-all transform flex items-center justify-center gap-2 ${
                                            isLoading || !email ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
                                        }`}
                                    >
                                        <Send size={18} />
                                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                                    </button>
                                </div>
                            )}

                            {/* Step 2: OTP Verification */}
                            {step === 'otp' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="bg-blue-400/20 backdrop-blur rounded-2xl p-4 border border-blue-300/30 flex items-start gap-3">
                                        <Clock className="text-blue-300 flex-shrink-0 mt-0.5" size={18} />
                                        <div className="text-sm text-blue-100">
                                            <p className="font-semibold">Check your email</p>
                                            <p className="text-xs text-blue-200">We sent a 6-digit OTP to <span className="font-bold">{email}</span></p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-white font-bold text-sm uppercase tracking-wider">
                                            Enter OTP
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" size={20} />
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-purple-400 transition text-center text-2xl font-bold tracking-widest placeholder:text-slate-400"
                                                placeholder="000000"
                                                maxLength="6"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        onClick={handleLogin}
                                        disabled={isLoading || otp.length !== 6}
                                        className={`w-full bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transition-all transform flex items-center justify-center gap-2 ${
                                            isLoading || otp.length !== 6 ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
                                        }`}
                                    >
                                        <ArrowRight size={18} />
                                        {isLoading ? 'Verifying...' : 'Verify & Login'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep('email');
                                            setOtp('');
                                        }}
                                        className="w-full text-blue-100 hover:text-white font-semibold text-sm transition-colors"
                                    >
                                        ← Back to Email
                                    </button>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px bg-white/20"></div>
                                <span className="text-white/60 text-xs font-bold">OR</span>
                                <div className="flex-1 h-px bg-white/20"></div>
                            </div>

                            {/* Google Login */}
                            <div className="flex justify-center">
                                <div className="bg-white/90 p-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <GoogleButton
                                        onSuccess={credentialResponse => {
                                            dispatch(GoogleLogin(credentialResponse.credential));
                                        }}
                                        onError={() => {
                                            toast.error('Google login failed');
                                        }}
                                    />
                                </div>
                            </div>

                        </form>
                    )}

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/20 text-center">
                        <p className="text-white/80 text-sm">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-blue-200 hover:text-blue-100 transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center">
                        <div className="text-2xl mb-2">🔐</div>
                        <p className="text-white/80 text-xs font-semibold">Secure Login</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-white/80 text-xs font-semibold">Instant Access</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
