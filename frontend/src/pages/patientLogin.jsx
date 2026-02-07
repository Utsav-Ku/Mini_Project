import { useDispatch, useSelector } from "react-redux";
import { updateLoginField } from "../features/patients/patientSlice";
import { loginPatient } from "../features/patients/patientThunk.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PatientLogin(){
    const dispatch = useDispatch();
    const {loginForm,loading,error} = useSelector((state)=>state.patientAuth);
    const patient = useSelector(
        (state) => state.patientAuth.patient
    );
    const navigate = useNavigate();
    
    useEffect(() => {
        if(patient){
            navigate("/patient/home");
        }
    }, [patient]);
    
    console.log("Logged in patient:", patient);
    
    const handleChange = (e)=>{
        const {name,value} = e.target;
        dispatch(updateLoginField({field:name,value:value}));
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(loginPatient());
    }
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
                <p className="text-gray-600 mb-8">Please log in to book appointment</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            value={loginForm.email} 
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={loginForm.password} 
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
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <button onClick={()=>navigate("/register")} className="text-blue-600 underline">New Patient? Register</button>
                <hr className="w-1/2 my-4" />
                <button onClick={() => navigate("/doctor/login")} className="text-green-600">Login as Doctor</button>
                <button onClick={() => navigate("/admin/login")} className="text-green-600">Login as Admin</button>
            </div>
        </div>
    );
}