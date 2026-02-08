import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAppointments } from "../features/appointments/appointmentThunk.js";
import PatientComponent from "../components/PatientComponent.jsx";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../features/patients/patientThunk.js";
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
        else{
            navigate("/doctor/login");
        }
    },[doctor,dispatch]);
    const pendingAppointments=appointments.filter((appt) => appt.doctorId === doctor.id && appt.status === "pending");
    console.log(pendingAppointments)
    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending Appointments</h1>
      <div className="grid gap-4">
        {pendingAppointments.map((appt) => (
          <PatientComponent key={appt.id} appointment={appt} />
        ))}
        {pendingAppointments.length === 0 && <p>No pending requests</p>}
      </div>
    </div>
  );
}