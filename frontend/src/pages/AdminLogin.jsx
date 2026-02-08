import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin } from "../features/admin/adminSlice";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector((state) => state.admin);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        if (isAuthenticated) {
            alert("Logged in successfully✅");
            navigate("/admin/dashboard");
        }
    }, [isAuthenticated, navigate])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(adminLogin(formData));
    }

    return (
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">
                
                {/* Left Side - Illustration */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-100 to-cyan-100 p-12 flex flex-col items-center justify-center">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-blue-900 mb-2">MediCare</h1>
                        <p className="text-blue-700 text-lg">Hospital Management System</p>
                    </div>
                    
                    {/* Illustration */}
                    <div className="relative w-full max-w-sm">
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <div className="flex items-center justify-around mb-6">
                                {/* Lamp */}
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-yellow-400 rounded-t-full mb-2"></div>
                                    <div className="w-2 h-16 bg-blue-400"></div>
                                    <div className="w-16 h-3 bg-blue-400 rounded-full"></div>
                                </div>
                                
                                {/* Doctor/Staff */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-pink-200 rounded-full mb-2 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <div className="w-20 h-16 bg-pink-400 rounded-lg flex items-center justify-center">
                                        <div className="w-16 h-12 bg-blue-500 rounded"></div>
                                    </div>
                                </div>
                                
                                {/* Clock */}
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-blue-400 rounded-full border-4 border-blue-600 flex items-center justify-center">
                                        <div className="relative">
                                            <div className="w-1 h-4 bg-blue-800 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                                            <div className="w-3 h-1 bg-blue-800 absolute top-2 left-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Desk with plant and coffee */}
                            <div className="flex items-end justify-center space-x-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-8 h-8 bg-green-500 rounded-t-full"></div>
                                    <div className="w-10 h-10 bg-blue-400 rounded-lg"></div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-6 h-8 bg-orange-300 rounded-t-lg">
                                        <div className="w-full h-2 bg-orange-100 rounded-t-lg mt-1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Admin Login</h2>
                        <p className="text-gray-600 mb-8">Please login to continue</p>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                                    </svg>
                                    <span>{error}</span>
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Admin Email
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter admin email"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Login Buttons */}
                            <div className="space-y-3 pt-2">
                                {/* Login as Admin Button */}
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                    {loading ? "Logging in..." : "Login as Admin"}
                                </button>
                                
                                {/* Login as Patient Button */}
                                <button 
                                    type="button"
                                    onClick={() => navigate("/")}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                    </svg>
                                    Login as Patient
                                </button>

                                {/* Login as Doctor Button */}
                                <button 
                                    type="button"
                                    onClick={() => navigate("/doctor/login")}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    Login as Doctor
                                </button>
                            </div>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center">
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}