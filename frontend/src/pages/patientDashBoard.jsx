import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { fetchAppointments } from "../features/appointments/appointmentThunk.js";
import { fetchDoctors } from "../features/doctors/doctorThunk.js";
import StatusBadge from "../components/statusBadge.jsx";

export default function PatientDashBoard(){
    const dispatch=useDispatch();
    const{appointments,loading:apptLoading}=useSelector((state)=>state.appointments);
    const{doctors,loading:doctorLoading}=useSelector((state)=>state.doctor);
    const patient=useSelector((state)=>state.patientAuth.patient);
    
    useEffect(()=>{
        dispatch(fetchAppointments());
        if(doctors.length===0){
            dispatch(fetchDoctors());
        }
    },[dispatch,doctors.length]);
    
    const myAppointments=appointments.filter((appt)=>appt.patientId===patient.id);
    
    const getDoctorName=(doctorId)=>{
        const doctor=doctors.find((doc)=>doc.id===doctorId);
        return doctor?doctor.name:"Unknown Doctor";
    };
    
    if(apptLoading||doctorLoading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <p className="text-lg text-gray-600 font-medium">Loading appointments...</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            My Appointments
                        </h1>
                        <p className="text-indigo-100 mt-2">View and manage your scheduled appointments</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {myAppointments.length === 0 ? (
                            <div className="text-center py-16">
                                <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <h3 className="mt-4 text-xl font-semibold text-gray-700">No appointments yet</h3>
                                <p className="mt-2 text-gray-500">You haven't scheduled any appointments. Book one to get started!</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-indigo-200">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Doctor
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Time Slot
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {myAppointments.map((appt) => (
                                            <tr key={appt.id} className="hover:bg-indigo-50 transition-colors duration-200">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                                                            {getDoctorName(appt.doctorId).charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {getDoctorName(appt.doctorId)}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-medium">{appt.slot}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="font-medium">{appt.date}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <StatusBadge status={appt.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Card */}
                {myAppointments.length > 0 && (
                    <div className="mt-6 bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Appointments</p>
                                <p className="text-2xl font-bold text-indigo-600">{myAppointments.length}</p>
                            </div>
                            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}