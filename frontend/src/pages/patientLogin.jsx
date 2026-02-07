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

        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-xl font-bold mb-4">Patient Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={loginForm.email} onChange={handleChange} className="w-full mb-3 p-2 border"/>
                <input type="password" name="password" placeholder="Password" value={loginForm.password} onChange={handleChange} className="w-full mb-3 p-2 border"/>
                {error && (
                    <p className="text-red-500 mb-3">
                    {error}
                    </p>
                )}
                <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-2">
                {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
} 
