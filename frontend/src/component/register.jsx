
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { RegisterUser, GoogleLogin } from "../slices/authSlices";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin as GoogleButton } from '@react-oauth/google';


// export default function Register() {
//     const dispatch = useDispatch();
//     // const navigate = useNavigate();

//     const [FormData, setFormData] = useState({
//         userName: "",
//         email: "",
//         password: "",
//         phoneNumber: ""
//     })

//     const [Error, setError] = useState({});
//     const [isLoading, setIsLoading] = useState(null);


//     const handleChange = (e) => {
//         setFormData({ ...FormData, [e.target.name]: e.target.value })
//     }

//     // const redirect = () => {
//     //     navigate("/login");
//     // }

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const errors = {};

//         if (FormData.userName.trim().length === 0) {
//             errors.userName = "UserName is Required"
//         }
//         if (FormData.email.trim().length === 0) {
//             errors.email = "Email is Required"
//         }
//         if (FormData.password.trim().length === 0) {
//             errors.password = "Password is Required"
//         }
//         if (FormData.phoneNumber.trim().length === 0) {
//             errors.phoneNumber = "Phone Number is Required";
//         }
//         if (Object.keys(errors).length !== 0) {
//             setError(errors);
//             return
//         }
//         console.log("FormData", FormData)
//         dispatch(RegisterUser(FormData));

//         // setError({});

//     }

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 px-4">
//             <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
//                 <h1 className="text-3xl font-bold text-center text-blue-700">
//                     Expense Tracker
//                 </h1>

//                 <form onSubmit={handleSubmit} className="space-y-5">

//                     <div>
//                         <label className="text-left block text-gray-700 font-medium mb-1">
//                             UserName :
//                         </label>

//                         <input
//                             type="text"
//                             value={FormData.userName}
//                             name="userName"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                             onBlur={() => {
//                                 if (FormData.userName.trim().length == 0) {
//                                     setError({ ...Error, userName: "UserName is required" });
//                                 }
//                             }}
//                         />

//                         {Error.userName && (
//                             <span className="text-red-500 text-sm block mt-1 text-left">
//                                 {Error.userName}
//                             </span>
//                         )}
//                     </div>


//                     <div>
//                         <label className=" text-left block text-gray-700 font-medium mb-1">
//                             Email :
//                         </label>

//                         <input
//                             type="email"
//                             value={FormData.email}
//                             name="email"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                             onBlur={() => {
//                                 if (FormData.email.trim().length == 0) {
//                                     setError({ ...Error, email: "Email is required" });
//                                 }
//                             }}
//                         />

//                         {Error.email && (
//                             <span className="text-red-500 text-sm block mt-1 text-left">
//                                 {Error.email}
//                             </span>
//                         )}
//                     </div>
//                     <div>
//                         <label className="text-left block text-gray-700 font-medium mb-1">
//                             Phone Number :
//                         </label>

//                         <input
//                             type="text"
//                             value={FormData.phoneNumber}
//                             name="phoneNumber"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                             onBlur={() => {
//                                 if (FormData.phoneNumber.trim().length == 0) {
//                                     setError({ ...Error, phoneNumber: "Phone Number is required" });
//                                 }
//                             }}
//                         />

//                         {Error.phoneNumber && (
//                             <span className="text-red-500 text-sm block mt-1 text-left">
//                                 {Error.phoneNumber}
//                             </span>
//                         )}
//                     </div>
//                     <div>
//                         <label className="text-left block text-gray-700 font-medium mb-1">
//                             PassWord :
//                         </label>

//                         <input
//                             type="password"
//                             value={FormData.password}
//                             name="password"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
//                             onBlur={() => {
//                                 if (FormData.password.trim().length == 0) {
//                                     setError({ ...Error, password: "Password is required" });
//                                 }
//                             }}
//                         />

//                         {Error.password && (
//                             <span className="text-red-500 text-sm block mt-1 text-left">
//                                 {Error.password}
//                             </span>
//                         )}
//                     </div>

//                     <div className="mb-4">
//                         <input
//                             type="submit"
//                             value="Register"
//                             className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
//                         />
//                     </div>

//                     <div className="flex flex-col items-center">
//                         <span className="text-gray-500 mb-2 text-sm">Or sign up with</span>
//                         <GoogleButton
//                             onSuccess={credentialResponse => {
//                                 dispatch(GoogleLogin(credentialResponse.credential));
//                             }}
//                             onError={() => {
//                                 console.log('Signup Failed');
//                             }}
//                         />
//                     </div>

//                 </form>

//             </div>
//         </div>

//     )
// }



import { useState } from "react";
import { useDispatch } from "react-redux";
import { RegisterUser, GoogleLogin } from "../slices/authSlices";
import { GoogleLogin as GoogleButton } from '@react-oauth/google';

export default function Register() {
    const dispatch = useDispatch();

    const [FormData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        phoneNumber: ""
    });

    const [Error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};

        if (FormData.userName.trim().length === 0) {
            errors.userName = "UserName is Required";
        }
        if (FormData.email.trim().length === 0) {
            errors.email = "Email is Required";
        }
        if (FormData.password.trim().length === 0) {
            errors.password = "Password is Required";
        }
        if (FormData.phoneNumber.trim().length === 0) {
            errors.phoneNumber = "Phone Number is Required";
        }

        if (Object.keys(errors).length !== 0) {
            setError(errors);
            return;
        }

        dispatch(RegisterUser(FormData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 px-4 relative overflow-hidden">

            {/* Background Glow Effects */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>

            <div className="relative w-full max-w-md bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">

                <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-6">
                    Create Account 🚀
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Username */}
                    <div>
                        <label className="block text-white font-medium mb-1">
                            UserName
                        </label>
                        <input
                            type="text"
                            value={FormData.userName}
                            name="userName"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-4 focus:ring-pink-400 transition"
                            onBlur={() => {
                                if (FormData.userName.trim().length == 0) {
                                    setError({ ...Error, userName: "UserName is required" });
                                }
                            }}
                        />
                        {Error.userName && (
                            <span className="text-yellow-200 text-sm block mt-1">
                                {Error.userName}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-white font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={FormData.email}
                            name="email"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-4 focus:ring-purple-400 transition"
                            onBlur={() => {
                                if (FormData.email.trim().length == 0) {
                                    setError({ ...Error, email: "Email is required" });
                                }
                            }}
                        />
                        {Error.email && (
                            <span className="text-yellow-200 text-sm block mt-1">
                                {Error.email}
                            </span>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-white font-medium mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={FormData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-4 focus:ring-indigo-400 transition"
                            onBlur={() => {
                                if (FormData.phoneNumber.trim().length == 0) {
                                    setError({ ...Error, phoneNumber: "Phone Number is required" });
                                }
                            }}
                        />
                        {Error.phoneNumber && (
                            <span className="text-yellow-200 text-sm block mt-1">
                                {Error.phoneNumber}
                            </span>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-white font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={FormData.password}
                            name="password"
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/80 focus:bg-white outline-none focus:ring-4 focus:ring-green-400 transition"
                            onBlur={() => {
                                if (FormData.password.trim().length == 0) {
                                    setError({ ...Error, password: "Password is required" });
                                }
                            }}
                        />
                        {Error.password && (
                            <span className="text-yellow-200 text-sm block mt-1">
                                {Error.password}
                            </span>
                        )}
                    </div>

                    {/* Register Button */}
                    <div>
                        <input
                            type="submit"
                            value="Register"
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300 cursor-pointer"
                        />
                    </div>

                    {/* Google Signup */}
                    <div className="flex flex-col items-center mt-4">
                        <span className="text-white/80 mb-3 text-sm">
                            Or sign up with
                        </span>
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                            <GoogleButton
                                onSuccess={credentialResponse => {
                                    dispatch(GoogleLogin(credentialResponse.credential));
                                }}
                                onError={() => {
                                    console.log('Signup Failed');
                                }}
                            />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
