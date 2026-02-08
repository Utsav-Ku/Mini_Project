import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { doctorLogin } from "../features/doctors/doctorAuthThunk.js"
import { useNavigate } from "react-router-dom";
export default function DoctorLogin(){
    const dispatch=useDispatch();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const {loading,error,doctor}=useSelector((state)=>state.doctorAuth);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(doctorLogin({ email, password }));
    };
    // Redirect to home page if doctor is logged in
    useEffect(()=>{
        if(doctor){
            navigate("/doctor/home");
        }
    },[doctor]);
    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Doctor Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="border p-2 rounded"/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border p-2 rounded"/>
                <button type="submit" className="bg-blue-600 text-white py-2 rounded" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
  );
}
