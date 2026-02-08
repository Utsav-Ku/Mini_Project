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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pending Appointments</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Logout</button>
      </div>
      <div className="grid gap-4">
        {pendingAppointments.map((appt) => (
          <PatientComponent key={appt.id} appointment={appt} />
        ))}
        {pendingAppointments.length === 0 && (
          <p>No pending requests</p>
        )}
      </div>
    </div>
  );
}