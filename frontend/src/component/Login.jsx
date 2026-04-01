

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GenerateOTP, VerifyOTP, GoogleLogin } from '../slices/authSlices';
import { GoogleLogin as GoogleButton } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.Auth);

    const handleGenerateOtp = (e) => {
        e.preventDefault();
        if (!email) {
            alert('Please enter email');
            return;
        }
        dispatch(GenerateOTP(email));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !otp) {
            alert('Please enter email and OTP');
            return;
        }
        dispatch(VerifyOTP({ email, otp }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 px-4">
            <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/30">
                
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Welcome Back 👋
                </h2>

                {isLoggedIn ? (
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-semibold">
                        🎉 You are logged in successfully!
                    </div>
                ) : (
                    <form className="space-y-5">

                        <div>
                            <label className="block text-white font-medium mb-2">
                                Email Address
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                                    placeholder="Enter your email"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleGenerateOtp}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 rounded-lg transition shadow-md"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">
                                Verify OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                                placeholder="Enter OTP"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
                        >
                            Login
                        </button>

                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-white/40"></div>
                            <span className="px-3 text-white text-sm">OR</span>
                            <div className="flex-grow h-px bg-white/40"></div>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-white p-2 rounded-lg shadow-md">
                                <GoogleButton
                                    onSuccess={credentialResponse => {
                                        dispatch(GoogleLogin(credentialResponse.credential));
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </div>

                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
