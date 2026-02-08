import { useDispatch, useSelector } from "react-redux";
import { updateRegisterField } from "../features/patients/patientSlice.js";
import { registerPatient } from "../features/patients/patientThunk.js";
import { Link } from "react-router-dom";

export default function PatientRegister() {
    const dispatch = useDispatch();
    const {registrationForm, loading, error} = useSelector((state) => state.patientAuth);
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(registerPatient())
    }
        
    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(updateRegisterField({field: name, value: value}))
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

                {/* Right Side - Registration Form */}
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Patient Registration</h2>
                        <p className="text-gray-600 mb-6">Create your account to book appointments</p>

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

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={registrationForm.name} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email Address
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={registrationForm.email} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                    placeholder="Enter your email"
                                    required
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
                                    value={registrationForm.password} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                    placeholder="Create a password"
                                    required
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                                    Confirm Password
                                </label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    value={registrationForm.confirmPassword} 
                                    onChange={handleChange} 
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>

                            {/* Age and Gender in a row */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Age Field */}
                                <div>
                                    <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                                        Age
                                    </label>
                                    <input 
                                        type="number" 
                                        id="age" 
                                        name="age" 
                                        value={registrationForm.age} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                        placeholder="Age"
                                        required
                                    />
                                </div>

                                {/* Gender Field */}
                                <div>
                                    <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                                        Gender
                                    </label>
                                    <select 
                                        id="gender" 
                                        name="gender" 
                                        value={registrationForm.gender} 
                                        onChange={handleChange} 
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Register Button */}
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                                    </svg>
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{" "}
                                <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}