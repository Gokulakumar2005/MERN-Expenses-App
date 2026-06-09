import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser, GoogleLogin } from "../slices/authSlices";
import { GoogleLogin as GoogleButton } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { User, Mail, Phone, Lock, CheckCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.Auth);

    const [FormData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        phoneNumber: ""
    });

    const [Error, setError] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });

        // Calculate password strength
        if (e.target.name === 'password') {
            let strength = 0;
            const pwd = e.target.value;
            if (pwd.length >= 8) strength += 1;
            if (pwd.match(/[a-z]+/)) strength += 1;
            if (pwd.match(/[A-Z]+/)) strength += 1;
            if (pwd.match(/[0-9]+/)) strength += 1;
            if (pwd.match(/[@$!%*?&]+/)) strength += 1;
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (FormData.userName.trim().length === 0) {
            errors.userName = "Full name is required";
        } else if (FormData.userName.trim().length < 2) {
            errors.userName = "Name must be at least 2 characters";
        }

        if (FormData.email.trim().length === 0) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(FormData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (FormData.password.trim().length === 0) {
            errors.password = "Password is required";
        } else if (FormData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        if (FormData.phoneNumber.trim().length === 0) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(FormData.phoneNumber.replace(/\D/g, ''))) {
            errors.phoneNumber = "Please enter a valid 10-digit phone number";
        }

        if (Object.keys(errors).length !== 0) {
            setError(errors);
            toast.error("Please fill all fields correctly.");
            return;
        }

        dispatch(RegisterUser(FormData));
    };

    const getPasswordStrengthLabel = () => {
        if (passwordStrength === 0) return { text: '', color: '' };
        if (passwordStrength <= 2) return { text: 'Weak', color: 'bg-red-400' };
        if (passwordStrength === 3) return { text: 'Fair', color: 'bg-orange-400' };
        if (passwordStrength === 4) return { text: 'Good', color: 'bg-yellow-400' };
        return { text: 'Strong', color: 'bg-green-400' };
    };

    const strength = getPasswordStrengthLabel();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 px-4 relative overflow-hidden">

            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-40 w-80 h-80 bg-emerald-400 rounded-full blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-40 w-80 h-80 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-80 h-80 bg-teal-400 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl shadow-lg mb-4">
                            <span className="font-black text-2xl text-white italic">E</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-2">Create Account</h1>
                        <p className="text-emerald-100 text-sm">Join thousands managing their finances</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="block text-white font-bold text-sm uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                                <input
                                    type="text"
                                    value={FormData.userName}
                                    name="userName"
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-emerald-400 transition"
                                    onBlur={() => {
                                        if (FormData.userName.trim().length == 0) {
                                            setError({ ...Error, userName: "Name is required" });
                                        }
                                    }}
                                />
                            </div>
                            {Error.userName && (
                                <span className="text-orange-200 text-xs block">
                                    {Error.userName}
                                </span>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-white font-bold text-sm uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                                <input
                                    type="email"
                                    value={FormData.email}
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-teal-400 transition"
                                    onBlur={() => {
                                        if (FormData.email.trim().length == 0) {
                                            setError({ ...Error, email: "Email is required" });
                                        }
                                    }}
                                />
                            </div>
                            {Error.email && (
                                <span className="text-orange-200 text-xs block">
                                    {Error.email}
                                </span>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="block text-white font-bold text-sm uppercase tracking-wider">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                                <input
                                    type="tel"
                                    value={FormData.phoneNumber}
                                    name="phoneNumber"
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                        setFormData({ ...FormData, phoneNumber: value });
                                    }}
                                    placeholder="98765 43210"
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                    onBlur={() => {
                                        if (FormData.phoneNumber.trim().length == 0) {
                                            setError({ ...Error, phoneNumber: "Phone is required" });
                                        }
                                    }}
                                />
                            </div>
                            {Error.phoneNumber && (
                                <span className="text-orange-200 text-xs block">
                                    {Error.phoneNumber}
                                </span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-white font-bold text-sm uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-200" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={FormData.password}
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/90 focus:bg-white outline-none focus:ring-2 focus:ring-green-400 transition"
                                    onBlur={() => {
                                        if (FormData.password.trim().length == 0) {
                                            setError({ ...Error, password: "Password is required" });
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {FormData.password && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 h-2 rounded-full bg-white/20 overflow-hidden">
                                        <div
                                            className={`${strength.color} transition-all`}
                                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    {strength.text && (
                                        <p className={`text-xs font-bold ${
                                            passwordStrength <= 2 ? 'text-orange-200' :
                                            passwordStrength === 3 ? 'text-yellow-200' :
                                            passwordStrength === 4 ? 'text-yellow-200' :
                                            'text-green-200'
                                        }`}>
                                            Password Strength: {strength.text}
                                        </p>
                                    )}
                                </div>
                            )}

                            {Error.password && (
                                <span className="text-orange-200 text-xs block">
                                    {Error.password}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl shadow-xl transition-all transform flex items-center justify-center gap-2 mt-6 ${
                                isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
                            }`}
                        >
                            <CheckCircle size={20} />
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/20"></div>
                        <span className="text-white/60 text-xs font-bold">OR</span>
                        <div className="flex-1 h-px bg-white/20"></div>
                    </div>

                    {/* Google Signup */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/90 p-2 rounded-xl shadow-lg">
                            <GoogleButton
                                onSuccess={credentialResponse => {
                                    dispatch(GoogleLogin(credentialResponse.credential));
                                }}
                                onError={() => {
                                    toast.error('Google signup failed');
                                }}
                            />
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-white/80 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-emerald-200 hover:text-emerald-100 transition-colors flex items-center justify-center gap-1 mt-2">
                            Sign In <ArrowRight size={14} />
                        </Link>
                    </p>

                    {/* Terms */}
                    <p className="text-center text-white/60 text-xs mt-6">
                        By signing up, you agree to our{' '}
                        <a href="#" className="underline hover:text-white/80 transition-colors">
                            Terms of Service
                        </a>
                        {' '}and{' '}
                        <a href="#" className="underline hover:text-white/80 transition-colors">
                            Privacy Policy
                        </a>
                    </p>
                </div>

                {/* Info Cards */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <p className="text-white/80 text-xs font-semibold">Secure & Safe</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20 text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <p className="text-white/80 text-xs font-semibold">Instant Setup</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
