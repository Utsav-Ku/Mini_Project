import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAppointments } from "../features/appointments/appointmentThunk.js";
import PatientComponent from "../components/PatientComponent.jsx";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../features/patients/patientThunk.js";
import { doctorlogout } from "../features/doctors/doctorAuthThunk.js";

export default function DoctorHomePage(){
    const appointments=useSelector((state)=>state.appointments.appointments);
    console.log("appointments",appointments)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const doctor=useSelector((state)=>state.doctorAuth.doctor);
    console.log("doctor",doctor)
    
    useEffect(()=>{
        if(doctor){
            dispatch(fetchAppointments()); // fetch all apointments;
            dispatch(fetchPatients()); // fetch all patients;
        }
    },[doctor,dispatch,navigate]);
    
    const handleLogout = () => {
        dispatch(doctorlogout());
        navigate("/");
    };
    
    if(!doctor){
        return null;
    }

    const pendingAppointments=appointments.filter((appt) => appt.doctorId === doctor.id && appt.status === "pending");
    console.log(pendingAppointments)
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Top Navigation Bar */}
            <nav className="bg-white shadow-lg border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo and Title */}
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Doctor Portal</h1>
                                <p className="text-xs text-gray-500 font-medium">Manage Your Appointments</p>
                            </div>
                        </div>

                        {/* Doctor Info and Logout */}
                        <div className="flex items-center space-x-4">
                            <div className="text-right mr-4 hidden md:block">
                                <p className="text-sm text-gray-500">Welcome back,</p>
                                <p className="font-bold text-gray-800">Dr. {doctor?.name}</p>
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                                <span className="font-semibold">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-3">Pending Appointments</h2>
                            <p className="text-indigo-100 text-lg">Review and manage patient appointment requests</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-white">{pendingAppointments.length}</p>
                                <p className="text-indigo-100 text-sm font-medium mt-2">Pending Requests</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {pendingAppointments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-2xl font-bold mb-3">No pending requests</p>
                            <p className="text-gray-500 text-base">All appointment requests have been processed</p>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-100">
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    Appointment Requests
                                </h3>
                                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-full border-2 border-indigo-200">
                                    {pendingAppointments.length} {pendingAppointments.length === 1 ? 'Request' : 'Requests'}
                                </span>
                            </div>
                            
                            <div className="grid gap-6">
                                {pendingAppointments.map((appt) => (
                                    <PatientComponent key={appt.id} appointment={appt} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}