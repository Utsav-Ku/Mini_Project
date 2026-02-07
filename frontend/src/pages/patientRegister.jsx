import { useDispatch, useSelector } from "react-redux";
import { updateRegisterField } from "../features/patients/patientSlice.js";
import { registerPatient } from "../features/patients/patientThunk.js";
export default function PatientRegister() {
    const dispatch=useDispatch();
    const {registrationForm,loading,error}=useSelector((state)=>state.patientAuth);
    function handleSubmit(e){
        e.preventDefault();
        dispatch(registerPatient())
    }
    const handleChange=(e)=>{
        const {name,value}=e.target;
        dispatch(updateRegisterField({field:name,value:value}))
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded">
            <h2 className="text-xl font-bold mb-4">Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={registrationForm.name} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={registrationForm.email} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" value={registrationForm.password} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={registrationForm.confirmPassword} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" id="age" name="age" value={registrationForm.age} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <input type="text" id="gender" name="gender" value={registrationForm.gender} onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    )
}

