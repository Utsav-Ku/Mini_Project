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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Patient Registration</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                            Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={registrationForm.name} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={registrationForm.email} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={registrationForm.password} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={registrationForm.confirmPassword} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="age" className="block text-gray-700 text-sm font-medium mb-2">
                            Age
                        </label>
                        <input 
                            type="number" 
                            id="age" 
                            name="age" 
                            value={registrationForm.age} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">
                            Gender
                        </label>
                        <input 
                            type="text" 
                            id="gender" 
                            name="gender" 
                            value={registrationForm.gender} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    {error && (
                        <p className="text-red-500 text-sm mb-4">
                            {error}
                        </p>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}